import { React, useRef } from "react";
import * as AC from "./AdminPageCss";
import { jsPDF } from "jspdf";
import { pdffont } from "../PdfFont"; // pdf 폰트 인코딩 파일
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

function AdminContractView() {
  const { contractText, setContractText } = useUser();

  const navi = useNavigate();

  // const [contractText, setContractText] = useState("");
  // 문서 영역
  const contractPage = useRef("");

  // ________________pdf 프린트 기능.
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

  // ________________프린트 버튼 로직 연결
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

  // ________________문서 유저 데이터에 저장
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
        console.log("문서 내용 :", contractText);
        setContractText("");
      } else {
        alert("문서 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("문서 저장 실패: ", err);
      alert("문서 저장에 실패했습니다.");
    }
  };

  return (
    <>
      <AC.ContractView id="printableArea">
        <div ref={contractPage}>
          <h2>위탁계약서</h2>
          <ol>
            <li dangerouslySetInnerHTML={{ __html: contractText }}></li>
          </ol>
        </div>
        <button onClick={savePdf}>PDF로 저장</button>
        <button onClick={printContent}>프린트</button>
        <button onClick={saveDocument}>저장</button>
      </AC.ContractView>
    </>
  );
}

export default AdminContractView;
