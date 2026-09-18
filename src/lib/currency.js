export const EXCHANGE_RATES = {
  USD: 1,
  KZT: 500,
  EUR: 0.92,
};

export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD", flagCode: "US" },
  { code: "KZT", symbol: "₸", label: "KZT", flagCode: "KZ" },
  { code: "EUR", symbol: "€", label: "EUR", flagCode: "EU" },
];

export const DEFAULT_CURRENCY = "USD";

export const convertPrice = (priceInUSD, currencyCode) => {
  const rate = EXCHANGE_RATES[currencyCode];
  if (!rate) return priceInUSD;
  return priceInUSD * rate;
};

export const formatPrice = (price, currencyCode) => {
  const curr = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  if (curr.code === "KZT") {
    const rounded = Math.round(price);
    return `${rounded.toLocaleString("ru-RU")} ${curr.symbol}`;
  }
  return `${curr.symbol}${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
