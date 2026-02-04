// Chart utility functions and data

export const generateDummySeries = (length, amplitude, offset = 0) => {
  const points = [];
  for (let i = 0; i < length; i++) {
    const x = i;
    const baseValue = amplitude / 2 +
      (amplitude / 2) *
        Math.sin((i / length) * Math.PI * 2 + offset) +
      (amplitude / 10) * Math.sin((i / length) * Math.PI * 6 + offset);
    // Ensure value is always greater than 0 (add minimum offset)
    const y = Math.max(amplitude * 0.1, baseValue);
    points.push({ x, y });
  }
  return points;
};

// Monitor Dashboard Series
export const POWER_SERIES = [
  {
    label: "Phase A",
    color: "#111827",
    data: generateDummySeries(48, 80, 0),
  },
  {
    label: "Phase B",
    color: "#ef4444",
    data: generateDummySeries(48, 65, 1),
  },
  {
    label: "Phase C",
    color: "#3b82f6",
    data: generateDummySeries(48, 70, 2),
  },
];

export const VOLTAGE_SERIES = [
  {
    label: "Voltage (AN)",
    color: "#111827",
    data: generateDummySeries(48, 240, 0),
  },
  {
    label: "Voltage (BN)",
    color: "#ef4444",
    data: generateDummySeries(48, 235, 1),
  },
  {
    label: "Voltage (CN)",
    color: "#3b82f6",
    data: generateDummySeries(48, 238, 2),
  },
];

// Insights Dashboard Series
export const CAPACITY_SERIES = [
  {
    label: "kW",
    color: "#0040C1",
    data: generateDummySeries(48, 500, 0),
  },
  {
    label: "kVA",
    color: "#66BB6A",
    data: generateDummySeries(48, 600, 1),
  },
];

export const VOLTAGE_INSIGHTS_SERIES = [
  {
    label: "Voltage (Vmax Average)",
    color: "#673AB7",
    data: generateDummySeries(48, 240, 0),
  },
];

// Site View Series
export const SITE_DYNAMIC_HOSTING_CAPACITY_SERIES = [
  {
    label: "Hosting capacity",
    color: "#0040C1",
    data: generateDummySeries(48, 500, 0),
  },
];

export const SITE_EV_CHARGER_SERIES = [
  {
    label: "Charging state",
    color: "#66BB6A",
    data: generateDummySeries(48, 100, 0),
  },
];

export const SITE_POWER_VMAX_SERIES = [
  {
    label: "Active Power",
    color: "#0040C1",
    data: generateDummySeries(48, 150, 0),
  },
  {
    label: "Reactive Power",
    color: "#66BB6A",
    data: generateDummySeries(48, 100, 1),
  },
];

export const SITE_VMAX_SERIES = [
  {
    label: "Voltage(LL)",
    color: "#66BB6A",
    data: generateDummySeries(48, 240, 0),
  },
];

export const SITE_DISAGGREGATION_SERIES = [
  {
    label: "Consumption",
    color: "#0040C1",
    data: generateDummySeries(48, 100, 0),
  },
  {
    label: "Generation",
    color: "#60a5fa",
    data: generateDummySeries(48, 80, 1),
  },
  {
    label: "Import",
    color: "#673AB7",
    data: generateDummySeries(48, 60, 2),
  },
  {
    label: "Export",
    color: "#a78bfa",
    data: generateDummySeries(48, 40, 3),
  },
];
