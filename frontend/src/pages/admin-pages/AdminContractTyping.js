import { React, useState, useRef } from "react";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

function AdminContractTyping() {
  const { user, contractText, setContractText } = useUser();

  const [countMenu, setCountMenu] = useState(1);

  // 입력 영역 - 타이틀
  const contractTitle = useRef("");
  const contractClientName = useRef("");
  const contractAdminName = useRef("");
  const contractContent = useRef("");

  // 입력 영역 - 내용
  const contractDescription = useRef("");
  const contractName = useRef("");

  // 만들어진 항을 오른쪽으로 보내는 함수
  const contractSubmit = (e) => {
    e.preventDefault();
    try {
      const description = contractDescription.current.value;
      const name = contractName.current.value;
      setCountMenu(countMenu + 1);

      const newContractText = `
      ${contractText}
      <br/>
        <h4>제 ${countMenu} 항</h4>
        <h3>${name}</h3>
        <p>${description}</p>
        <hr/>
      `;

      setContractText(newContractText);

      contractDescription.current.value = "";
      contractName.current.value = "";
      console.log("내용 :", newContractText);
    } catch (err) {
      console.error("에러 메세지 :", err);
    }
  };

  if (!user && !localStorage.getItem("user")) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <AC.ContractTyping>
      <form onSubmit={contractSubmit}>
        <AC.ContentNameText>
          <input
            ref={contractTitle}
            placeholder="계약서 제목을 입력해주세요."
          />
        </AC.ContentNameText>
        <AC.ContractTitle>
          <AC.ContractContentText>
            <AC.ContractContentinput
              ref={contractClientName}
              placeholder="발주처의 이름을 입력해주세요."
            />
            <span>(이하 "발주처라 함")과 </span>
            <AC.ContractContentinput
              ref={contractAdminName}
              placeholder="수주처의 이름을 입력해주세요."
            />
            <span>(이하 "수주처"라 함)은</span>
            <AC.ContractContentinput
              ref={contractContent}
              placeholder="계약 제목을 입력해주세요."
            />
            <p>{contractTitle.current.value}</p>
            <span>와 관련한 계약을 다름과 같이 체결한다.</span>
          </AC.ContractContentText>
        </AC.ContractTitle>
        <AC.ContractContent>
          <h4>제 {countMenu} 항</h4>
          <input ref={contractName} placeholder="항목 이름" />
          <textarea ref={contractDescription} placeholder="내용" />
          <button type="submit">항 추가</button>
        </AC.ContractContent>
      </form>
    </AC.ContractTyping>
  );
}

export default AdminContractTyping;
