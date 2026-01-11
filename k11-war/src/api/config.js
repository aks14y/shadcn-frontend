import { logApiError } from "./errorLogger";

let apiConfig = {
  hostUrl: "",
  csrfToken: null,
  authToken: null,
  isInitialized: false,
};

const AUTH_URL = process.env.REACT_APP_API_AUTH_URL;
const LOCAL_HOST = process.env.REACT_APP_API_LOCAL_HOST;
const API_USER = process.env.REACT_APP_API_USER;
const API_PASSWORD = process.env.REACT_APP_API_PASSWORD;
const API_BASE_PATH = process.env.REACT_APP_API_BASE_PATH || "/k11/api/v1.0";

let authPromise = null;

const isLocal = () =>
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const authenticateLocal = async () => {
  if (!isLocal()) {
    throw new Error("Authentication API should only be called in local development");
  }

  if (authPromise) return authPromise;

  authPromise = (async () => {
    const payload = {
      user: API_USER,
      password: API_PASSWORD,
      csrfTokenNeeded: true,
    };

    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = new Error("Authentication failed");
      error.status = response.status;
      logApiError(error, {
        endpoint: AUTH_URL,
        method: "POST",
      });
      throw error;
    }

    const data = await response.json();
    apiConfig.csrfToken = data.csrfToken;
    apiConfig.authToken = data.token;
    apiConfig.hostUrl = `https://${LOCAL_HOST}`;
    return apiConfig;
  })();

  return authPromise;
};

const getCsrfToken = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("csrfToken");
};

const initializeApi = async () => {
  if (apiConfig.isInitialized) return apiConfig;

  if (isLocal()) {
    await authenticateLocal();
  } else {
    apiConfig.csrfToken = getCsrfToken();
    apiConfig.hostUrl = `${window.location.protocol}//${window.location.host}`;
  }
  apiConfig.isInitialized = true;
  return apiConfig;
};

export const apiFetch = async (endpoint, options = {}) => {
  if (!apiConfig.isInitialized) await initializeApi();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(apiConfig.csrfToken && { "X-Kalki-CSRF": apiConfig.csrfToken }),
    ...(apiConfig.authToken && {
      Authorization: `Bearer ${apiConfig.authToken}`,
    }),
    ...options.headers,
  };

  const response = await fetch(`${apiConfig.hostUrl}${endpoint}`, {
    headers,
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const responseData = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;

    if (responseData && typeof responseData === "object") {
      if (responseData.message) {
        errorMessage = responseData.message;
      } else if (responseData.errorCode) {
        errorMessage = responseData.errorCode;
      }
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.response = response;
    error.responseData = responseData;

    logApiError(error, {
      endpoint,
      method: options.method || "GET",
    });

    throw error;
  }

  return responseData;
};

export const getApiConfig = () => apiConfig;
export const resetApiConfig = () => {
  apiConfig = {
    hostUrl: "",
    csrfToken: null,
    authToken: null,
    isInitialized: false,
  };
  authPromise = null;
};
