import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={theme => css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
          'Helvetica Neue', Arial, sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
        line-height: 1.5;
        transition: background-color 0.3s ease;
      }

      img {
        max-width: 100%;
        height: auto;
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

export default GlobalStyles; 