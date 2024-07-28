import React, { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as AC from "./AdminPageCss";

function Admin_main() {
  const { user } = useUser();
  const [documents, setDocuments] = useState([]);
  const LOGOUT_SERVER_URL = "http://localhost:5000/api/users/logout";
  const navi = useNavigate();

  console.log(user);
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/documents",
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log(
            "Documents fetched successfully:",
            response.data.documents
          );
          setDocuments(response.data.documents);
        } else {
          console.error("문서 리스트를 가져오는데 실패했습니다.", response);
        }
      } catch (err) {
        console.error("문서 리스트를 가져오는 중 오류가 발생했습니다:", err);
      }
    };
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGOUT_SERVER_URL, {
        withCredentials: true, // 쿠키를 함께 보내기 위해 필요
      });
      if (response.status === 200) {
        alert("로그아웃 합니다.");
        navi("/login");
      } else {
        console.error("로그아웃 실패 :", response);
      }
    } catch (err) {
      console.error("로그아웃 과정에서 오류 발생 :", err);
    }
  };

  if (user) {
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

              <button type="submit">로그아웃</button>
            </form>
          </AC.Gnav>
          <AC.Next>
            <AC.ContractBtn onClick={() => navi("/admin/contract/new")}>
              계약서 작성하기
            </AC.ContractBtn>
          </AC.Next>
        </AC.Menu>
        <AC.Typing>
          <ul>
            {documents.map((doc) => (
              <li
                key={doc._id}
                onClick={() => navi(`/admin/contract/${doc._id}`)}
              >
                {doc.title?.title || "제목 없음"} -
                {/* 제목이 없는 요소들이 있어서 mainpage에서 오류가 뜸. ===> 문서 만들때 (항목 하나라도 빠져있으면 alart을 띄우기) */}
                {new Date(doc.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </AC.Typing>
      </AC.Wrapper>
    );
  } else {
    return (
      <>
        <h1>로그인 정보가 없습니다.</h1>
      </>
    );
  }
}

export default Admin_main;
