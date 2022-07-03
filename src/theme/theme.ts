import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: "#00a9e0",
    default: "#17171a",
    light: "#fff",
    gray: "#f5f5f5",
    error: "#e36049",
    yellow: "#ffd88a",
    yellowDark: "#fdb82e",
  },
  spacing: (multiplier?: number) => `${(multiplier || 1) * 8}px`,
};
