import { React, useState, useEffect, useRef } from "react";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

function AdminContractTyping({
  updateTitle,
  updateContent,
  updateSign,
  htmlPage,
}) {
  const {
    user,
    setContractMainTitle,
    contractText,
    setContractText,
    setContractSign,
  } = useUser();

  // 계약서 타이틀 관련 Ref
  const contractTitle = useRef(null);
  const contractClientName = useRef(null);
  const contractAdminName = useRef(null);
  const contractContent = useRef(null);

  // 계약서 내용 관련 Ref
  const contractName = useRef(null);
  const contractDescription = useRef(null);

  // 계약서 서명 관련 Ref
  const adminCompany = useRef(null);
  const adminAdrass = useRef(null);
  const adminCEO = useRef(null);
  const adminPhone = useRef(null);
  const adminAccountNumber = useRef(null);

  const canvasRef = useRef(null);
  const signRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!user) {
      setContractMainTitle({});
      setContractText([]);
      setContractSign({});
    }
  }, [user, setContractMainTitle, setContractText, setContractSign]);

  // ___제목 업데이트 관련
  const contractTitleSubmit = (e) => {
    e.preventDefault();

    let newContractMainTitle = {};

    if (htmlPage === "title") {
      const title = contractTitle.current.value;
      const clientName = contractClientName.current.value;
      const adminName = contractAdminName.current.value;
      const content = contractContent.current.value;

      newContractMainTitle = { title, clientName, adminName, content };

      // 입력 필드 비우기
      contractTitle.current.value = "";
      contractClientName.current.value = "";
      contractAdminName.current.value = "";
      contractContent.current.value = "";

      setContractMainTitle(newContractMainTitle);
      updateTitle(newContractMainTitle);
      console.log("제목 :", newContractMainTitle);
    }
  };

  // ___내용 업데이트 관련
  const contractContentSubmit = (e) => {
    e.preventDefault();

    let newContractText = [];

    if (htmlPage === "contents") {
      const name = contractName.current.value;
      const description = contractDescription.current.value;

      newContractText = [...contractText, { name, description }];

      // 입력 필드 비우기
      contractName.current.value = "";
      contractDescription.current.value = "";

      setContractText(newContractText);
      updateContent(newContractText);
      console.log("내용 :", newContractText);
    }
  };

  // ___서명 업데이트 관련
  const contractSignSubmit = (e) => {
    e.preventDefault();

    const dataUrl = canvasRef.current.toDataURL();
    let newContractSign = {};

    const company = adminCompany.current.value;
    const adrass = adminAdrass.current.value;
    const CEO = adminCEO.current.value;
    const phone = adminPhone.current.value;
    const accountNumber = adminAccountNumber.current.value;

    newContractSign = { company, adrass, CEO, phone, accountNumber, dataUrl };

    // 입력 필드 비우기
    adminCompany.current.value = "";
    adminAdrass.current.value = "";
    adminCEO.current.value = "";
    adminPhone.current.value = "";
    adminAccountNumber.current.value = "";

    setContractSign(newContractSign);
    updateSign(newContractSign);
    clearCanvas();
    console.log("서명 :", newContractSign);
  };

  // ___서명 업데이트 관련

  useEffect(() => {
    if (htmlPage === "sign") {
      const canvas = canvasRef.current;
      if (canvas) {
        const signContext = canvas.getContext("2d");
        signContext.scale(1, 1);
        signContext.lineCap = "round";
        signContext.strokeStyle = "black";
        signContext.lineWidth = 3;

        signRef.current = signContext;
      } else {
        console.log(
          "캔버스 요소가 아직 준비되지 않았습니다. 다시 시도합니다..."
        );
      }
    }
  }, [htmlPage]); // htmlPage 변경에 따라 useEffect 재실행

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (signRef.current) {
      signRef.current.beginPath();
      signRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (signRef.current) {
      signRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const drawing = ({ nativeEvent }) => {
    if (!isDrawing || !signRef.current) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    signRef.current.lineTo(offsetX, offsetY);
    signRef.current.stroke();
  };
  // ___서명 지우기

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const signContext = canvas.getContext("2d");
      if (signContext) {
        signContext.fillStyle = "white";
        signContext.fillRect(0, 0, canvas.width, canvas.height);
        console.log("Canvas cleared");
      }
    }
  };

  if (!user && !localStorage.getItem("user")) {
    return <div>로그인이 필요합니다.</div>;
  }

  const renderForm = () => {
    if (htmlPage === "title") {
      return (
        <AC.ContractTyping>
          <form onSubmit={contractTitleSubmit}>
            <AC.ContentNameText>
              <AC.ContractInput
                ref={contractTitle}
                placeholder="계약서 제목을 입력해주세요."
                style={{ width: "80%" }}
              />
            </AC.ContentNameText>
            <AC.ContractTitle>
              <AC.ContractContentText>
                <AC.ContractContentInputSec>
                  <AC.ContractInput
                    ref={contractClientName}
                    placeholder="발주처의 이름을 입력해주세요."
                    maxLength={20}
                  ></AC.ContractInput>
                  <AC.ContractContentSpan>
                    (이하 "발주처라 함")과
                  </AC.ContractContentSpan>
                </AC.ContractContentInputSec>
                <AC.ContractContentInputSec>
                  <AC.ContractInput
                    ref={contractAdminName}
                    placeholder="수주처의 이름을 입력해주세요."
                    maxLength={20}
                  />
                  <AC.ContractContentSpan>
                    (이하 "수주처"라 함)은
                  </AC.ContractContentSpan>
                </AC.ContractContentInputSec>
                <AC.ContractContentInputSec>
                  <AC.ContractInput
                    ref={contractContent}
                    placeholder="계약 제목을 입력해주세요."
                    maxLength={50}
                  />
                  <AC.ContractContentSpan>
                    와 관련한 계약을 다름과 같이 체결한다.
                  </AC.ContractContentSpan>
                </AC.ContractContentInputSec>
              </AC.ContractContentText>
            </AC.ContractTitle>
            <AC.ContractTypingBtn type="submit">제목 추가</AC.ContractTypingBtn>
          </form>
        </AC.ContractTyping>
      );
    } else if (htmlPage === "contents") {
      return (
        <AC.ContractTyping>
          <form onSubmit={contractContentSubmit}>
            <AC.ContractContent>
              <AC.ContractInput
                ref={contractName}
                placeholder="항목 이름"
                style={{ width: "90%" }}
              />
              <AC.ContractContentTextarea
                ref={contractDescription}
                placeholder="내용"
                rows="10"
                maxLength={500}
              />
            </AC.ContractContent>
            <AC.ContractTypingBtn type="submit">항 추가</AC.ContractTypingBtn>
          </form>
        </AC.ContractTyping>
      );
    } else if (htmlPage === "sign") {
      return (
        <AC.ContractTyping>
          <form onSubmit={contractSignSubmit}>
            <AC.ContractContent>
              <h4 style={{ marginBottom: "1.5rem", marginLeft: "0.5rem" }}>
                서명을 입력해 주세요.
              </h4>
              <AC.ContractInput placeholder="회사명" ref={adminCompany} />
              <AC.ContractInput placeholder="주소" ref={adminAdrass} />
              <AC.ContractInput placeholder="대표자" ref={adminCEO} />
              <AC.ContractInput placeholder="연락처" ref={adminPhone} />
              <AC.ContractInput
                placeholder="계좌번호"
                ref={adminAccountNumber}
              />
              <AC.ContentSignCanvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={drawing}
                ref={canvasRef}
              />
            </AC.ContractContent>
            <AC.ContractTypingBtn type="submit">서명 추가</AC.ContractTypingBtn>
            <AC.ContractTypingBtn onClick={clearCanvas}>
              서명 지우기
            </AC.ContractTypingBtn>
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
