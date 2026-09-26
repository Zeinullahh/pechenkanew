// Centralized color configuration for the entire application

// Globe colors
export const GLOBE_COLORS = {
  aurora: {
    background: "#01091C",
    atmosphere: "#C100D2",
    globeMaterial: "#FF00B7",
    ambientLight: 0xbbbbbb,
    directionalLight1: 0xffffff,
    directionalLight2: 0x7982f6,
    pointLight: 0x8566cc,
    fog: 0x535ef3,

    blacklist: "rgb(255, 0, 0)",
    noTraffic: "rgb(255, 255, 255)",
    lowTraffic: "rgb(0, 200, 0)",
    mediumTraffic: "rgb(255, 215, 0)",
    highTraffic: "rgb(0, 0, 139)",
  },

  primary: {
    background: "#01091C",
    atmosphere: "#B300FF",
    globeMaterial: "#D100F6",
    ambientLight: 0xbbbbbb,
    directionalLight1: 0xffffff,
    directionalLight2: 0x9f4bff,
    pointLight: 0xa35cff,
    fog: 0x120a2f,

    blacklist: "rgb(255, 0, 0)",
    noTraffic: "rgb(255, 255, 255)",
    lowTraffic: "rgb(46, 233, 117)",
    mediumTraffic: "rgb(236, 234, 64)",
    highTraffic: "#00C8FF",
  },

  blue: {
    background: "#01091C",
    atmosphere: "#0074D9",
    globeMaterial: "#0074D9",
    ambientLight: 0xbbbbbb,
    directionalLight1: 0xffffff,
    directionalLight2: 0x0074d9,
    pointLight: 0x0074d9,
    fog: 0x001f3f,

    blacklist: "rgb(255, 0, 0)",
    noTraffic: "rgb(240, 249, 255)",
    lowTraffic: "rgb(147, 197, 253)",
    mediumTraffic: "rgb(29, 78, 216)",
    highTraffic: "rgb(15, 23, 42)",
  },

  emerald: {
    background: "#01091C",
    atmosphere: "#00FFBF",
    globeMaterial: "#007F66",
    ambientLight: 0xbbbbbb,
    directionalLight1: 0xffffff,
    directionalLight2: 0x00ffbf,
    pointLight: 0x007f66,
    fog: 0x003333,

    blacklist: "rgb(255, 77, 77)",
    noTraffic: "rgb(200, 255, 240)",
    lowTraffic: "rgb(167, 243, 208)",
    mediumTraffic: "rgb(34, 197, 94)",
    highTraffic: "rgb(6, 95, 70)",
  },
};

// Server load chart colors
export const CHART_COLORS = {
  stroke: "#fff",
  grid: "#888888",
  tooltipCursor: "#BABABA",
  referenceDot: "#BABABA",
  referenceLine: "#BABABA",
  gradientStart: "#fff",
  gradientEnd: "#fff",
};

// UI colors
export const UI_COLORS = {
  error: "rgb(255, 0, 0)",
  success: "rgb(0, 193, 97)",
  warning: "rgb(233, 225, 0)",
  info: "rgb(78, 0, 233)",
  toastBackground: "#111",
  toastText: "#eee",
};

// Helper function to get country color based on traffic value
export const getCountryColor = (
  value,
  maxValue,
  countryCode,
  blacklist,
  theme
) => {
  if (blacklist && blacklist.includes(countryCode)) {
    return theme.blacklist;
  }
  if (value === 0) return theme.noTraffic;

  const section = Math.round((maxValue / 3) * 100) / 100;
  if (value <= section) return theme.lowTraffic;
  if (value <= section * 2) return theme.mediumTraffic;
  return theme.highTraffic;
};
