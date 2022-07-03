import React from "react";
import { Global, css, useTheme } from "@emotion/react";

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css(`
        body {
          color: ${theme.colors.default};
          background: ${theme.colors.gray};
          font-size: 16px;
          font-weight: 500;
          font-family: 'Montserrat', sans-serif;
          margin: 0;
          line-height: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        a, button {
          outline: none;
        }

        * {
          box-sizing: border-box;
        }
        
        svg {
          transition: 0.2s ease-in;
          display: block;
        }
    `)}
    />
  );
};
