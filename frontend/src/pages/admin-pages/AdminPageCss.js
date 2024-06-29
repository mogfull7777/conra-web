import styled from "styled-components";

// AdminMain.js css

export const Wrapper = styled.main`
  width: 100%;
  box-sizing: border-box;
  height: 100vh; // 전체 뷰포트 높이 사용
  overflow: hidden; // 스크롤 방지
  display: grid;
  grid-template-columns: 1.4fr 4.3fr 4.3fr;
  grid-template-areas: "menu typing page";
  grid-gap: 1rem;
`;

export const Menu = styled.aside`
  width: 100%;
  height: auto;
  grid-area: menu;
  display: grid;
  grid-template-rows: 10% auto 10%;
  grid-template-areas: "user" "gnav" "next";

  word-break: break-all;
`;

export const Typing = styled.main`
  width: 100%;
  height: auto;
  grid-area: typing;
  background-color: blue;
`;
export const Page = styled.div`
  width: 100%;
  height: auto;
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
  padding: 1rem;
  word-break: break-all;
  background-color: #d9d9d9;
`;

// AdminContractnav.js css

export const AdminNavTitle = styled.h3`
  margin-bottom: 1rem;
`;

export const AdminNavBtn = styled.button`
  width: 80%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 3rem;
  border: none;

  background-color: #353535;
  font-size: 80%;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;

  &:hover {
    color: #353535;
    background: #ffffff;
  }
`;
export const AdminNavMenuBtn = styled.li`
  padding: 1rem 0 0 0;
  cursor: pointer;
  transition: all 0.4s;

  &:last-child {
    padding: 1rem 0 1rem 0;
  }

  &:hover {
    font-weight: bold;
  }
`;

// AdminContractTyping.js css
export const ContractTyping = styled.div`
  width: 100%;
  height: auto;
  grid-area: typing;

  padding: 2rem;
`;

// AdminContractTyping.js css
// ===> (htmlpage === "title")

export const ContentNameText = styled.div`
  margin-bottom: 1rem;
`;

export const ContractTitle = styled.article`
  display: flex;
  word-break: brack-all;
`;

export const ContractContentText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContractContentInputSec = styled.div`
  display: flex;
`;

export const ContractContentSpan = styled.span`
  margin-left: 0.3rem;
  line-height: 2.375rem;
`;
export const ContractInput = styled.input`
  width: 50%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 2rem;
  border: none;
  background-color: #d9d9d9;
  padding: 1.25rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  outline: none;
  &::placeholder {
    color: #ffffff;
  }
`;

// ===> (htmlpage === "contents")

export const ContractContent = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContractContentTextarea = styled.textarea`
  width: 90%;
  height: auto;
  resize: none;
  box-sizing: border-box;
  border-radius: 1rem;
  border: none;
  background-color: #d9d9d9;
  padding: 1.25rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  outline: none;
  &::placeholder {
    color: #ffffff;
  }
`;

// ===> (htmlpage === "sign")

export const ContractSignInput = styled.input`
  width: 60%;
  height: 1.5rem;
`;

export const ContentSignCanvas = styled.canvas`
  width: 45%;
  height: 30%;
  border: 0.01rem solid #999;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
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
  margin-right: 0.5rem;
  &:hover {
    color: #353535;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

// AdminContractView.js css

// 1. CRUD 버튼 수정 (hover기능으로 마우스 올리면 z-index로 나오게 구동되게.)
// 2. 이전 페이지 등 View 쪽 버튼 수정

// 기술적 수정

// 1. 새로고침 관련
// 2. 내용을 다 입력하지 않으면 내용 추가 요청 alart
// 3. 수정창 alart -> 팝업으로 수정.

export const ContractView = styled.section`
  width: 100%;
  height: 100vh; // 전체 뷰포트 높이 사용
  grid-area: page;
  background-color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden; // 스크롤 방지
`;

export const ContractPaper = styled.article`
  width: 85%;
  aspect-ratio: 1 / 1.414; // A4 비율 1:1.414 (210mm x 297mm)
  max-width: 210mm;
  max-height: 297mm;
  background-color: #ffffff;
  padding: 5%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ContractPaperTextView = styled.div`
  width: 100%;
  height: 100%;
  word-break: keep-all;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const ContractPaperTitle = styled.h3`
  text-align: center;
  font-weight: bolder;
  font-size: calc(0.2rem + 1vw);
  margin-bottom: calc(1rem + 1vw);
  // background-color: #999;
`;

export const ContractPaperSubTitle = styled.h4`
  font-weight: bold;
  font-size: calc(0.06rem + 0.8vw);
  margin-bottom: calc(0.6rem + 0.8vw);
  // background-color: #999;
`;

export const ContentPaperTextPosition = styled.div`
  word-break: keep-all;
`;

export const ContractPaperContractTitle = styled.span`
  font-weight: bold;
  font-size: calc(0.05rem + 0.6vw);
  margin-bottom: calc(0.05rem + 0.4vw);
  margin-left: calc(0.05rem + 0.4vw);
  // background-color: #999;
`;

export const ContractPaperContractList = styled.li`
  list-style: none;
  position: relative;
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

export const ContractSignImg = styled.img`
  width: 15rem;
  height: 8rem;
`;

export const ContractCRUD = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  opacity: 0;
  display: flex;
  justify-content: flex-end;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
    background: rgba(255, 172, 172, 0.3);
  }
`;

export const ContractCRUDBtn = styled.button`
  box-sizing: border-box;
  border: none;
  color: #353535;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  margin-right: 1%;
  &:hover {
    color: #ffffff;
    background-color: #353535;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

export const ContractPageBtnBox = styled.div`
  margin-top: 0.5rem;
`;

export const ContractPageBtn = styled.button`
  box-sizing: border-box;
  border: none;
  color: #353535;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  margin-right: 1rem;
  padding: 0.4rem;
  &:hover {
    color: #ffffff;
    background-color: #353535;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

// AdminContractCheck.js css
