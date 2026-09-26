// Centralized mock data and configuration for WebSOC sandbox
import { DEMO_NOW } from "./mockData.js";

export const GLOBE_COLORS = {
  aurora: {
    name: "Aurora",
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
    name: "Primary",
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
    name: "Blue",
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
    name: "Emerald",
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

export const CHART_COLORS = {
  stroke: "#fff",
  grid: "#888888",
  tooltipCursor: "#BABABA",
  referenceDot: "#BABABA",
  referenceLine: "#BABABA",
  gradientStart: "#fff",
  gradientEnd: "#fff",
};

export const getCountryColor = (value, maxValue, countryCode, blacklist, theme) => {
  if (blacklist && blacklist.includes(countryCode)) {
    return theme.blacklist;
  }
  if (!value || value === 0) return theme.noTraffic;

  const section = Math.round((maxValue / 3) * 100) / 100;
  if (value <= section) return theme.lowTraffic;
  if (value <= section * 2) return theme.mediumTraffic;
  return theme.highTraffic;
};

export const COUNTRIES = [
  { code: "US", name: "United States of America" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Federal Republic of Germany" },
  { code: "FR", name: "French Republic" },
  { code: "JP", name: "Japan" },
  { code: "CA", name: "Canada" },
  { code: "SG", name: "Republic of Singapore" },
  { code: "NL", name: "Kingdom of the Netherlands" },
  { code: "AU", name: "Commonwealth of Australia" },
  { code: "KZ", name: "Republic of Kazakhstan" },
  { code: "IN", name: "Republic of India" },
  { code: "BR", name: "Federative Republic of Brazil" },
  { code: "RU", name: "Russian Federation" },
  { code: "CN", name: "People's Republic of China" },
  { code: "KR", name: "Republic of Korea" },
  { code: "SE", name: "Kingdom of Sweden" },
  { code: "CH", name: "Swiss Confederation" },
  { code: "ES", name: "Kingdom of Spain" },
  { code: "IT", name: "Italian Republic" },
  { code: "PL", name: "Republic of Poland" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Kingdom of Saudi Arabia" },
  { code: "ZA", name: "Republic of South Africa" },
  { code: "KP", name: "Democratic People's Republic of Korea" },
  { code: "IR", name: "Islamic Republic of Iran" },
  { code: "TR", name: "Republic of Turkey" },
  { code: "IL", name: "State of Israel" },
  { code: "NO", name: "Kingdom of Norway" },
  { code: "FI", name: "Republic of Finland" },
  { code: "IE", name: "Ireland" },
  { code: "AT", name: "Republic of Austria" },
  { code: "BE", name: "Kingdom of Belgium" },
  { code: "DK", name: "Kingdom of Denmark" },
  { code: "NZ", name: "New Zealand" },
  { code: "MX", name: "United Mexican States" },
  { code: "AR", name: "Argentine Republic" },
  { code: "CL", name: "Republic of Chile" },
  { code: "CO", name: "Republic of Colombia" },
  { code: "ID", name: "Republic of Indonesia" },
  { code: "MY", name: "Malaysia" },
  { code: "TH", name: "Kingdom of Thailand" },
  { code: "VN", name: "Socialist Republic of Viet Nam" },
  { code: "PH", name: "Republic of the Philippines" },
  { code: "EG", name: "Arab Republic of Egypt" },
  { code: "NG", name: "Federal Republic of Nigeria" },
  { code: "KE", name: "Republic of Kenya" },
  { code: "MA", name: "Kingdom of Morocco" },
  { code: "GR", name: "Hellenic Republic" },
  { code: "PT", name: "Portuguese Republic" },
  { code: "CZ", name: "Czech Republic" },
  { code: "RO", name: "Romania" },
  { code: "HU", name: "Hungary" },
];

export const INITIAL_WEBSOC_AGENTS = [
  {
    id: "agent-1",
    domain: "silenceai.net",
    ipAddress: "94.131.90.73",
    verified: true,
    dnsRouted: true,
    verificationKey: "ws-verif-7f9a2b",
    ports: [80, 443],
    enable2FA: true,
  },
  {
    id: "agent-2",
    domain: "api.silenceai.net",
    ipAddress: "185.199.108.153",
    verified: true,
    dnsRouted: true,
    verificationKey: "ws-verif-9c4d11",
    ports: [443],
    enable2FA: true,
  },
  {
    id: "agent-3",
    domain: "auth.silenceai.net",
    ipAddress: "185.199.109.153",
    verified: true,
    dnsRouted: false,
    verificationKey: "ws-verif-e21b88",
    ports: [443],
    enable2FA: false,
  },
  {
    id: "agent-4",
    domain: "portal.silenceai.net",
    ipAddress: "45.142.214.12",
    verified: false,
    dnsRouted: false,
    verificationKey: "ws-verif-44aa09",
    ports: [80, 443],
    enable2FA: false,
  },
];

export const INITIAL_WEBSOC_METRICS = {
  "silenceai.net": {
    US: {
      "Requests per second (RPS)": 48.5,
      "Bandwidth usage": 52428800, // ~51.2 MB
      "Number of IP addresses with active connection(s)": 142,
      "Processed requests": 1455,
    },
    GB: {
      "Requests per second (RPS)": 24.2,
      "Bandwidth usage": 25165824, // ~24.5 MB
      "Number of IP addresses with active connection(s)": 68,
      "Processed requests": 726,
    },
    DE: {
      "Requests per second (RPS)": 31.8,
      "Bandwidth usage": 33554432, // ~32.7 MB
      "Number of IP addresses with active connection(s)": 94,
      "Processed requests": 954,
    },
    FR: {
      "Requests per second (RPS)": 18.4,
      "Bandwidth usage": 18874368,
      "Number of IP addresses with active connection(s)": 52,
      "Processed requests": 552,
    },
    JP: {
      "Requests per second (RPS)": 22.1,
      "Bandwidth usage": 23068672,
      "Number of IP addresses with active connection(s)": 61,
      "Processed requests": 663,
    },
    CA: {
      "Requests per second (RPS)": 14.6,
      "Bandwidth usage": 15728640,
      "Number of IP addresses with active connection(s)": 39,
      "Processed requests": 438,
    },
    SG: {
      "Requests per second (RPS)": 19.3,
      "Bandwidth usage": 20971520,
      "Number of IP addresses with active connection(s)": 48,
      "Processed requests": 579,
    },
    NL: {
      "Requests per second (RPS)": 16.5,
      "Bandwidth usage": 17825792,
      "Number of IP addresses with active connection(s)": 45,
      "Processed requests": 495,
    },
    AU: {
      "Requests per second (RPS)": 11.2,
      "Bandwidth usage": 12582912,
      "Number of IP addresses with active connection(s)": 28,
      "Processed requests": 336,
    },
    KZ: {
      "Requests per second (RPS)": 28.4,
      "Bandwidth usage": 29360128,
      "Number of IP addresses with active connection(s)": 84,
      "Processed requests": 852,
    },
    BR: {
      "Requests per second (RPS)": 9.8,
      "Bandwidth usage": 10485760,
      "Number of IP addresses with active connection(s)": 25,
      "Processed requests": 294,
    },
    IN: {
      "Requests per second (RPS)": 15.7,
      "Bandwidth usage": 16777216,
      "Number of IP addresses with active connection(s)": 42,
      "Processed requests": 471,
    },
  },
  "api.silenceai.net": {
    US: {
      "Requests per second (RPS)": 32.1,
      "Bandwidth usage": 35651584,
      "Number of IP addresses with active connection(s)": 88,
      "Processed requests": 963,
    },
    DE: {
      "Requests per second (RPS)": 15.4,
      "Bandwidth usage": 16777216,
      "Number of IP addresses with active connection(s)": 44,
      "Processed requests": 462,
    },
    KZ: {
      "Requests per second (RPS)": 14.2,
      "Bandwidth usage": 14680064,
      "Number of IP addresses with active connection(s)": 38,
      "Processed requests": 426,
    },
    GB: {
      "Requests per second (RPS)": 12.0,
      "Bandwidth usage": 12582912,
      "Number of IP addresses with active connection(s)": 31,
      "Processed requests": 360,
    },
  },
};

export const INITIAL_WEBSOC_TOP_COUNTRIES = [
  {
    countryCode: "United States (US)",
    country: "United States",
    code: "US",
    activeIps: 230,
    bandwidthUsage: 88080384,
    requestsPerSecond: 80.6,
  },
  {
    countryCode: "Germany (DE)",
    country: "Germany",
    code: "DE",
    activeIps: 138,
    bandwidthUsage: 50331648,
    requestsPerSecond: 47.2,
  },
  {
    countryCode: "Kazakhstan (KZ)",
    country: "Kazakhstan",
    code: "KZ",
    activeIps: 122,
    bandwidthUsage: 44040192,
    requestsPerSecond: 42.6,
  },
  {
    countryCode: "United Kingdom (GB)",
    country: "United Kingdom",
    code: "GB",
    activeIps: 99,
    bandwidthUsage: 37748736,
    requestsPerSecond: 36.2,
  },
  {
    countryCode: "Japan (JP)",
    country: "Japan",
    code: "JP",
    activeIps: 61,
    bandwidthUsage: 23068672,
    requestsPerSecond: 22.1,
  },
  {
    countryCode: "France (FR)",
    country: "France",
    code: "FR",
    activeIps: 52,
    bandwidthUsage: 18874368,
    requestsPerSecond: 18.4,
  },
  {
    countryCode: "Singapore (SG)",
    country: "Singapore",
    code: "SG",
    activeIps: 48,
    bandwidthUsage: 20971520,
    requestsPerSecond: 19.3,
  },
  {
    countryCode: "Netherlands (NL)",
    country: "Netherlands",
    code: "NL",
    activeIps: 45,
    bandwidthUsage: 17825792,
    requestsPerSecond: 16.5,
  },
  {
    countryCode: "India (IN)",
    country: "India",
    code: "IN",
    activeIps: 42,
    bandwidthUsage: 16777216,
    requestsPerSecond: 15.7,
  },
  {
    countryCode: "Canada (CA)",
    country: "Canada",
    code: "CA",
    activeIps: 39,
    bandwidthUsage: 15728640,
    requestsPerSecond: 14.6,
  },
  {
    countryCode: "Australia (AU)",
    country: "Australia",
    code: "AU",
    activeIps: 28,
    bandwidthUsage: 12582912,
    requestsPerSecond: 11.2,
  },
  {
    countryCode: "Brazil (BR)",
    country: "Brazil",
    code: "BR",
    activeIps: 25,
    bandwidthUsage: 10485760,
    requestsPerSecond: 9.8,
  },
];

export function generateHistoricalStats(range = "1 day", isUnderAttack = false, now = DEMO_NOW) {
  const points = range === "1 day" ? 24 : range === "7 days" ? 28 : 30;
  const stepMs = (range === "1 day" ? 3600 : range === "7 days" ? 3600 * 6 : 3600 * 24) * 1000;
  const stats = [];

  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now - i * stepMs);
    const wave = Math.sin(i / 3) * 15 + Math.cos(i / 2) * 8;
    let rps = Math.max(15, Math.round(45 + wave));
    let ips = Math.max(50, Math.round(180 + wave * 4));
    let bandwidth = Math.max(5000000, Math.round((rps * 1024 * 1024) / 1.5));

    // If attack is simulated, spike the last 2-3 intervals
    if (isUnderAttack && i < 3) {
      rps = Math.round(rps * 35 + 3500);
      ips = Math.round(ips * 20 + 8000);
      bandwidth = Math.round(bandwidth * 40 + 800000000);
    }

    stats.push({
      interval_start: time.toISOString(),
      total_rps: rps,
      total_ips: ips,
      total_bandwidth: bandwidth,
    });
  }

  return stats;
}

export const INITIAL_WEBSOC_PAYMENTS = [
  {
    id: "txn_01j9a8b1c2d3e4f5g6h7j8k9",
    date: "2026-09-24 14:32",
    amount: "$250.00",
    status: "Completed",
    currency: "USD",
  },
  {
    id: "txn_01j8x7y6z5w4v3u2t1s0r9q8",
    date: "2026-09-18 10:15",
    amount: "$500.00",
    status: "Completed",
    currency: "USD",
  },
  {
    id: "txn_01j7p6o5n4m3l2k1j0i9h8g7",
    date: "2026-09-01 09:00",
    amount: "$500.00",
    status: "Completed",
    currency: "USD",
  },
];
