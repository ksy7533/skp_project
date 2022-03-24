import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'NotoSansKR';
    font-style: normal;
    font-weight: 300;
    src: url('./fonts/NotoSansKR-Light.otf') format('truetype');
  }
  
  @font-face {
    font-family: 'NotoSansKR';
    font-style: normal;
    font-weight: 400;
    src: url('./fonts/NotoSansKR-Regular.otf') format('truetype');
  }
  
  @font-face {
    font-family: 'NotoSansKR';
    font-style: normal;
    font-weight: 500;
    src: url('./fonts/NotoSansKR-Medium.otf') format('truetype');
  }
  
  @font-face {
    font-family: 'NotoSansKR';
    font-style: normal;
    font-weight: 700;
    src: url('./fonts/NotoSansKR-Bold.otf') format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-weight: 300;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: url('./fonts/Roboto-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-weight: 400;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: url('./fonts/Roboto-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-weight: 500;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: url('./fonts/Roboto-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Roboto';
    font-weight: 700;
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039;
    src: url('./fonts/Roboto-Light.ttf') format('truetype');
  }

  body {
    font-family: 'NotoSansKR', 'Roboto', 'sans-serif';
    background-color: #ffffff;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  ol, ul, li {
    list-style: none;
  }
  img {
    vertical-align: top;
    width: 100%;
    height: auto;
  }
`;

export default GlobalStyle;
