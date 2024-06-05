import { React, useState, useRef } from "react";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

function AdminContractTyping({ updatePreview, htmlPage }) {
  const { user, contractText, setContractText } = useUser();
  const [countMenu, setCountMenu] = useState(1);

  const contractTitle = useRef(null);
  const contractClientName = useRef(null);
  const contractAdminName = useRef(null);
  const contractContent = useRef(null);
  const contractDescription = useRef(null);
  const contractName = useRef(null);

  const contractSubmit = (e) => {
    e.preventDefault();
    let newContractText = "";

    // ___제목 업데이트 관련
    if (htmlPage === "title") {
      const title = contractTitle.current.value;
      const clientName = contractClientName.current.value;
      const adminName = contractAdminName.current.value;
      const content = contractContent.current.value;

      newContractText = `
      ${contractText}
      
      ${title}
      ${clientName} (이하 "발주처라 함")과 ${adminName} (이하 "수주처"라 함)은 ${content}와 관련한 계약을 다름과 같이 체결한다.
    `;

      // 입력 필드 비우기
      contractTitle.current.value = "";
      contractClientName.current.value = "";
      contractAdminName.current.value = "";
      contractContent.current.value = "";
    }
    // ___내용 업데이트 관련
    else if (htmlPage === "contents") {
      const description = contractDescription.current.value;
      const name = contractName.current.value;
      setCountMenu(countMenu + 1);

      newContractText = `
      ${contractText}
      
      제 ${countMenu} 항 [${name}]
      ${description}
    `;

      // 입력 필드 비우기
      contractDescription.current.value = "";
      contractName.current.value = "";
    }

    setContractText(newContractText);
    updatePreview(newContractText);
    console.log("내용 :", newContractText);
  };

  if (!user && !localStorage.getItem("user")) {
    return <div>로그인이 필요합니다.</div>;
  }

  const renderForm = () => {
    if (htmlPage === "title") {
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
                <p>{contractTitle.current?.value}</p>
                <span>와 관련한 계약을 다름과 같이 체결한다.</span>
              </AC.ContractContentText>
            </AC.ContractTitle>
            <button type="submit">항 추가</button>
          </form>
        </AC.ContractTyping>
      );
    } else if (htmlPage === "contents") {
      return (
        <AC.ContractTyping>
          <form onSubmit={contractSubmit}>
            <AC.ContractContent>
              <h4>제 {countMenu} 항</h4>
              <input ref={contractName} placeholder="항목 이름" />
              <textarea ref={contractDescription} placeholder="내용" />
              <button type="submit">항 추가</button>
            </AC.ContractContent>
          </form>
        </AC.ContractTyping>
      );
    } else {
      return <div>페이지를 선택하세요</div>;
    }
  };

  return <>{renderForm()}</>;
}

export default AdminContractTyping;
