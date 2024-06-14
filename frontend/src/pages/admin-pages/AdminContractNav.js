import React, { useState } from "react";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";

function AdminContractNav({ setHtmlPage }) {
  const { user, logoutUser } = useUser();
  const [pdfChack, setPdfChack] = useState(false);
  const navi = useNavigate();

  const pdfHandleToggle = () => {
    setPdfChack(!pdfChack);
    navi(pdfChack ? "/admin/contract" : "/admin/contract/contractcheck");
  };

  return (
    <>
      <AC.StepMenu>
        <h3>반갑습니다! {user.name}</h3>
        <button onClick={logoutUser}>로그아웃</button>
        <h3>메뉴영역</h3>
        <ul>
          <li onClick={() => setHtmlPage("title")}>계약서 제목 설정</li>
          <li onClick={() => setHtmlPage("contents")}>계약내용 입력</li>
          <li onClick={() => setHtmlPage("sign")}>서명 입력</li>
          <li>
            <button onClick={pdfHandleToggle}>
              {pdfChack ? "계약서 작성 화면 보기" : "계약서 pdf로 보기"}
            </button>
          </li>
        </ul>
      </AC.StepMenu>
    </>
  );
}

export default AdminContractNav;
