import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar
  {
    width: 8px;
    height: 8px;
    background-color: #F5F5F5;
  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #3059c9;
  }
  body {
    font-weight: 400;
    font-size: 16px;
    font-family: regular;
    font-display: swap;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    line-height: 1;
    -webkit-font-smoothing: antialiased !important;
  }
  a {
    background-color: transparent;
    text-decoration: none;
    &:active,
    &:hover {
      outline: none;
      opacity: 0.8;
    }
  }

  /* Make clicks pass-through */
  @keyframes spin {
    0%  {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  /* NProgress Start */
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: '#f15a22';
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #f15a22, 0 0 5px #f15a22;
    opacity: 1.0;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #f15a22;
    border-left-color: #f15a22;
    border-radius: 50%;
    -webkit-animation: spin 400ms linear infinite;
    animation: spin 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner, .bar {
    position: absolute;
  }
  /* NProgress End */

  .slick-slide img {
    width: 100%;
  }
`;

export default GlobalStyle;
