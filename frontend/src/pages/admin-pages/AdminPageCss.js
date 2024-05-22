import styled from "styled-components";

// AdminMain.js css

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr 5fr;
  grid-template-areas: "menu typing page";
  grid-gap: 1rem;
  background-color: #575;
`;

export const Menu = styled.aside`
  width: 100%;
  height: 100%;
  grid-area: menu;
  display: grid;
  grid-template-rows: 10% auto 10%;
  grid-template-areas: "user" "gnav" "next";
  background-color: #999;
  word-break: break-all;
`;

export const Typing = styled.main`
  width: 100%;
  height: 100%;
  grid-area: typing;
  background-color: blue;
`;
export const Page = styled.div`
  width: 100%;
  height: 100%;
  grid-area: page;
  background-color: gray;
`;

export const User = styled.div`
  grid-area: user;

  background-color: #870584;
`;

export const Gnav = styled.div`
  grid-area: gnav;

  background-color: #870584;
`;

export const Next = styled.div`
  grid-area: next;

  padding: 1rem;
  background-color: #870584;
`;

export const ContractBtn = styled.button`
  width: 100%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 4.375rem;
  border: none;
  box-shadow: 0px 0px 0px 0.025rem #ffffff;
  background-color: #353535;
  padding: 1.25rem;
  font-size: 1.25rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  &:hover {
    color: #353535;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

// AdminContract1.js css

export const StepMenu = styled.aside`
  width: 100%;
  height: 100%;
  grid-area: menu;
  grid-template-rows: 10% auto 10%;

  background-color: #999;
  word-break: break-all;
`;
export const ContractTyping = styled.aside`
  width: 100%;
  height: 100%;
  grid-area: typing;
  background-color: gray;
`;

export const ContractView = styled.main`
  width: 100%;
  height: auto;
  grid-area: page;
  background-color: blue;
`;