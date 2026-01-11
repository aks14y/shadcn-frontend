const logError = (error, context = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    message: error.message || "Unknown error",
    status: error.status,
    endpoint: context.endpoint,
    method: context.method || "GET",
    responseData: error.responseData,
    stack: error.stack,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.error("[API Error]", errorLog);

  if (error.status >= 500) {
    console.error("[Server Error]", {
      status: error.status,
      endpoint: context.endpoint,
      message: error.message,
      responseData: error.responseData,
    });
  } else if (error.status === 401) {
    console.error("[Authentication Error]", {
      endpoint: context.endpoint,
      message: error.message,
    });
  } else if (error.status === 403) {
    console.error("[Authorization Error]", {
      endpoint: context.endpoint,
      message: error.message,
    });
  } else if (error.status === 404) {
    console.warn("[Not Found]", {
      endpoint: context.endpoint,
      message: error.message,
    });
  } else if (error.status >= 400) {
    console.error("[Client Error]", {
      status: error.status,
      endpoint: context.endpoint,
      message: error.message,
      responseData: error.responseData,
    });
  }

  return errorLog;
};

export const logApiError = (error, context = {}) => {
  return logError(error, context);
};

export const logQueryError = (error, query) => {
  const context = {
    endpoint: query.queryKey?.[1] || query.queryKey?.[0],
    method: "GET",
    queryKey: query.queryKey,
  };
  return logError(error, context);
};

export const logMutationError = (error, variables) => {
  const context = {
    endpoint: variables?.endpoint,
    method: variables?.method || "POST",
    variables,
  };
  return logError(error, context);
};
