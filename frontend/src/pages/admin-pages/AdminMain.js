import React from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as AC from "./AdminPageCss";

function Admin_main() {
  const { user } = useUser();
  const LOGOUT_SERVER_URL = "http://localhost:5000/api/users/logout";
  const navi = useNavigate();

  const loginHandle = () => {
    navi("/login");
  };

  console.log(user);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGOUT_SERVER_URL, {
        withCredentials: true, // 쿠키를 함께 보내기 위해 필요
      });
      if (response.status === 200) {
        alert("로그아웃 합니다.");
        loginHandle();
      } else {
        console.error("로그아웃 실패 :", response);
      }
    } catch (err) {
      console.error("로그아웃 과정에서 오류 발생 :", err);
    }
  };

  return (
    <AC.Wrapper>
      <h1>환영합니다 {user.name}님!</h1>
      <form onSubmit={logoutHandler}>
        <div>
          {user && (
            <>
              <p>UserID: {user.userId}</p>
              <p>Token: {user.tokenInCookies}</p>
              <p>name: {user.name}</p>
              <p>email: {user.email}</p>
            </>
          )}
          <button type="submit">로그아웃</button>
        </div>
      </form>
      <AC.ContractBtn onClick={() => navi("/admin/contract")}>
        계약서 작성하기
      </AC.ContractBtn>
    </AC.Wrapper>
  );
}

export default Admin_main;
