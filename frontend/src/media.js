import { css } from "styled-components";

const sizes = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

// 미디어 쿼리용

// import styled from 'styled-components';
// import { media } from './media';

// const StyledButton = styled.button`
//   background: palevioletred;
//   color: white;

//   ${media.mobileL`
//     background: blue;
//   `}
//   ${media.tablet`
//     background: green;
//   `}
// `;

// ===> 이런식으로 사용
