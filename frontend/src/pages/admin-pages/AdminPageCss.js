import styled from "styled-components";

// AdminMain.js css

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 5fr 5fr;
  grid-template-areas: "menu typing page";
  grid-gap: 1rem;
`;

export const Menu = styled.aside`
  width: 100%;
  height: 100%;
  grid-area: menu;
  display: grid;
  grid-template-rows: 10% auto 10%;
  grid-template-areas: "user" "gnav" "next";
  border: 1px solid green;
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
  height: auto;
  grid-area: menu;
  grid-template-rows: 10% auto 10%;

  border: 1px solid green;
  word-break: break-all;
`;

// AdminContractnav.js css

// AdminContractTyping.js css
export const ContractTyping = styled.div`
  width: 100%;
  height: 100%;
  grid-area: typing;
  border: 1px solid green;
`;

// AdminContractTyping.js css
// ===> (htmlpage === "title")

export const ContentNameText = styled.div`
  padding: 1rem;
`;

export const ContractTitle = styled.article`
  display: flex;
  word-break: keep-all;
`;

export const ContractContentText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContractContentInputSec = styled.div`
  display: flex;
`;

export const ContractContentInput = styled.input`
  width: 5rem;
  height: 1.2rem;
`;

// ===> (htmlpage === "contents")

export const ContractContent = styled.article`
  display: flex;
  flex-direction: column;
`;

export const ContractContentTitle = styled.input`
  width: 60%;
  height: 1.5rem;
`;

export const ContractContentTextarea = styled.textarea`
  width: 90%;
  height: auto;
  resize: none;
`;

// ===> (htmlpage === "sign")

export const ContractSignInput = styled.input`
  width: 60%;
  height: 1.5rem;
`;

export const ContentSignCanvas = styled.canvas`
  width: 15rem;
  height: 8rem;
  background-color: gray;
`;

export const ContractTypingBtn = styled.button`
  width: 10rem;
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
  margin-left: auto;
  &:hover {
    color: #353535;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

// AdminContractView.js css

// export const ContractView = styled.section`
//   width: 100%;
//   height: auto;
//   grid-area: page;
//   border: 1px solid green;
//   background-color: gray;
//   position: relative;
// `;

// export const ContractPaper = styled.article`
//   width: 85%;
//   max-width: 210mm;
//   aspect-ratio: 210 / 297; /* A4 비율 유지 */
//   background-color: #eee;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   padding: 6rem;
//   box-sizing: border-box;
// `;

export const ContractView = styled.section`
  width: 100%;
  height: auto;
  grid-area: page;
  border: 1px solid green;
  background-color: gray;
  position: relative;
`;

export const ContractPaper = styled.article`
  width: 85%;
  max-width: 210mm;
  aspect-ratio: 210 / 297;
  background-color: #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 6rem;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ContractPaperTextView = styled.div`
  width: 100%;
  height: 80%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border: 1px dashed red; /* 디버깅을 위해 추가한 스타일 */
`;

export const ContractPaperTitle = styled.h3`
  text-align: center;
  font-weight: bolder;
  font-size: calc(0.2rem + 1vw);
  margin-bottom: calc(1rem + 1vw);
`;

export const ContractPaperSubTitle = styled.h4`
  font-weight: bold;
  font-size: calc(0.06rem + 0.8vw);
  margin-bottom: calc(0.6rem + 0.8vw);
`;

export const ContractPaperContractTitle = styled.span`
  font-weight: bold;
  font-size: calc(0.05rem + 0.6vw);
  margin-bottom: calc(0.05rem + 0.4vw);
  margin-left: calc(0.05rem + 0.4vw);
`;

export const ContractPaperContractList = styled.li`
  list-style: none;
`;

export const ContractPaperContractContext = styled.p`
  font-weight: normal;
  font-size: calc(0.05rem + 0.5vw);
  margin-bottom: calc(0.05rem + 0.4vw);
`;

export const ContractPaperText = styled.p`
  font-weight: normal;
  font-size: calc(0.05rem + 0.5vw);
  margin-bottom: calc(0.05rem + 0.5vw);
`;

// AdminContractCheck.js css
