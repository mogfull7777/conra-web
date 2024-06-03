import React from "react";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

function AdminContractNav() {
  const { user, logoutUser } = useUser();

  return (
    <>
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
    </>
  );
}

export default AdminContractNav;
