import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
      default: string;
      light: string;
      gray: string;
      error: string;
      yellow: string;
      yellowDark: string;
    };
    spacing: (multiplier?: number) => string;
  }
}
