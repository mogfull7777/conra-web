import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../../UserContext";
import Cookies from "js-cookie";
import * as AC from "./AdminPageCss";
import { jsPDF } from "jspdf";
import { pdffont } from "../PdfFont"; // pdf 폰트 인코딩 파일
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminContract1() {
  const { user, saveUser, logoutUser } = useUser();
  const navi = useNavigate();

  const [contractText, setContractText] = useState("");
  const [countMenu, setCountMenu] = useState(1);

  const contractDescription = useRef("");
  const contractName = useRef("");
  const contractPage = useRef("");

  useEffect(() => {
    // 토큰을 사용하여 유저 정보를 가져오고 저장.
    const token = Cookies.get("user_auth");
    if (token) {
      fetchUserFromToken(token).then((fetchedUser) => {
        saveUser(fetchedUser);
      });
    }
  }, [saveUser]);

  const fetchUserFromToken = async (token) => {
    // 서버에서 토큰을 사용하여 유저 정보를 가져오는 함수
    const response = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  // pdf 프린트 기능.
  const savePdf = () => {
    const doc = new jsPDF({
      orientation: "p", // "p"는 세로(portrait), "l"은 가로(landscape)
      unit: "mm", // 단위는 mm
      format: "a4", // A4 크기
    });

    // 폰트 추가 및 설정
    doc.addFileToVFS("SUITE Variable.ttf", pdffont);
    doc.addFont("SUITE Variable.ttf", "SUITE Variable", "normal");

    // 폰트 크기 설정
    doc.setFontSize(11);
    // 폰트 설정
    doc.setFont("SUITE Variable");
    // 텍스트 추가
    const text = contractText;
    const lines = doc.splitTextToSize(text, 190); // A4 페이지의 실제 사용 가능 너비를 고려 (예: 190mm)
    doc.text(lines, 10, 20);
    // PDF 저장
    doc.save("contract.pdf");
  };

  // 프린트 버튼 로직 연결
  const printContent = () => {
    const printableArea = document.getElementById("printableArea");
    if (!printableArea) {
      console.error("printableArea element not found");
      return;
    }
    // 기존 내용 저장
    const originalContents = document.body.innerHTML;
    // 프린트할 내용 설정
    const printContents = printableArea.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    // 원래 내용 복원
    document.body.innerHTML = originalContents;
    window.location.reload(); // 페이지를 새로 고침하여 원래 상태로 복원
  };

  // 문서 유저 데이터에 저장
  const saveDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/saveContract",
        { document: contractText },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("문서가 저장되었습니다.");
        navi("/admin");
      } else {
        alert("문서 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("문서 저장 실패: ", err);
      alert("문서 저장에 실패했습니다.");
    }
  };

  // 만들어진 항을 오른쪽으로 보내는 함수
  const contractSubmit = (e) => {
    e.preventDefault();
    try {
      const description = contractDescription.current.value;
      const name = contractName.current.value;
      setCountMenu(countMenu + 1);

      const newContractText = `${contractText}\n\n 제 ${countMenu} 항 \n${name}\n${description}`;

      setContractText(newContractText);

      contractDescription.current.value = "";
      contractName.current.value = "";
      console.log("내용 :", newContractText);
    } catch (err) {
      console.error("에러 메세지 :", err);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AC.Wrapper>
        <AC.StepMenu>
          <h3>반갑습니다! {user.name}</h3>
          <button onClick={logoutUser}>로그아웃</button>
          <h3>메뉴영역</h3>
          <ul>
            <li>계약서 제목 설정</li>
            <li>계약내용 입력</li>
            <li>날인 관련</li>
          </ul>
        </AC.StepMenu>
        <AC.ContractTyping>
          <div>
            <form onSubmit={contractSubmit}>
              제 {countMenu} 항
              <input ref={contractName} placeholder="항목 이름" />
              <textarea ref={contractDescription} placeholder="내용" />
              <button type="submit">항 추가</button>
            </form>
          </div>
        </AC.ContractTyping>
        <AC.ContractView id="printableArea">
          <div ref={contractPage}>
            <h2>문서 영역</h2>
            <pre>{contractText}</pre>
          </div>
          <button onClick={savePdf}>PDF로 저장</button>
          <button onClick={printContent}>프린트</button>
          <button onClick={saveDocument}>저장</button>
        </AC.ContractView>
      </AC.Wrapper>
    </>
  );
}

export default AdminContract1;

// 1. 레이아웃 나누기 ---> grid를 써볼까요?
// 2. 제 1 항 상위 부터 자동으로 카운트 적히게
// 3. 출력한걸 카운트 할 수 있게.
// 4. 싸인 관련 설계하기.

// essue
// 1. 새로고침하면 user.name을 읽을 수 없다고 뜸 <해결>
