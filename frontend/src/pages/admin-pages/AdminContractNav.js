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
        <AC.AdminNavTitle>
          반갑습니다!
          <br />
          {user.name}
        </AC.AdminNavTitle>
        <AC.AdminNavBtn onClick={logoutUser}>로그아웃</AC.AdminNavBtn>
        <ul>
          <AC.AdminNavMenuBtn onClick={() => setHtmlPage("title")}>
            계약서 제목 설정
          </AC.AdminNavMenuBtn>
          <AC.AdminNavMenuBtn onClick={() => setHtmlPage("contents")}>
            계약내용 입력
          </AC.AdminNavMenuBtn>
          <AC.AdminNavMenuBtn onClick={() => setHtmlPage("sign")}>
            서명 입력
          </AC.AdminNavMenuBtn>
        </ul>

        <AC.AdminNavBtn onClick={pdfHandleToggle}>
          {pdfChack ? "계약서 작성 화면 보기" : "계약서 pdf로 보기"}
        </AC.AdminNavBtn>
      </AC.StepMenu>
    </>
  );
}

export default AdminContractNav;
