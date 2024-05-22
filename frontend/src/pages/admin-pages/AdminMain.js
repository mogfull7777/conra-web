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
      <AC.Menu>
        <AC.User>
          <h1>환영합니다 {user.name}님!</h1>
        </AC.User>
        <AC.Gnav>
          <form onSubmit={logoutHandler}>
            <ul>
              <li>계약서 관리</li>
              <li>저장된 양식</li>
            </ul>
            {/* <div>
              {user && (
                <>
                  <p>UserID: {user.userId}</p>
                  <p>Token: {user.tokenInCookies}</p>
                  <p>name: {user.name}</p>
                  <p>email: {user.email}</p>
                </>
              )}
            </div> */}
            <button type="submit">로그아웃</button>
          </form>
        </AC.Gnav>
        <AC.Next>
          <AC.ContractBtn onClick={() => navi("/admin/contract")}>
            계약서 작성하기
          </AC.ContractBtn>
        </AC.Next>
      </AC.Menu>
      <AC.Typing>서류목록</AC.Typing>
      <AC.Page>여긴 뭐드라</AC.Page>
    </AC.Wrapper>
  );
}

export default Admin_main;
