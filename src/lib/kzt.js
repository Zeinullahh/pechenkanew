// Deprecated: prefer `src/lib/currency.js`.
// Kept as a thin shim so existing PricingSection imports keep working.
import { convertPrice, formatPrice } from "./currency";

export const KZT_RATE = 500;

export const formatKzt = (usdAmount) => {
  const kzt = convertPrice(usdAmount, "KZT");
  return formatPrice(kzt, "KZT");
};
