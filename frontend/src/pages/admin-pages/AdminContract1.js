import React, { useState, useEffect } from "react";
import { useUser } from "../../UserContext";
import Cookies from "js-cookie";
import * as AC from "./AdminPageCss";
import axios from "axios";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminContractNav from "./AdminContractNav";
import AdminContractTyping from "./AdminContractTyping";
import AdminContractView from "./AdminContractView";
import AdminContractCheck from "./AdminContractCheck";

const AdminContractLayout = ({
  updateTitle,
  updateContent,
  updateSign,
  htmlPage,
  setHtmlPage,
}) => {
  return (
    <>
      <AdminContractNav setHtmlPage={setHtmlPage} />
      <AdminContractTyping
        updateTitle={updateTitle}
        updateContent={updateContent}
        updateSign={updateSign}
        htmlPage={htmlPage}
      />
      <Outlet />
    </>
  );
};

function AdminContract1() {
  const { user, saveUser } = useUser();
  // 계약서의 메인 제목을 추가하는 state
  const [contractMainTitle, setContractMainTitle] = useState({});
  // 계약서의 항목을 추가하는 state
  const [contractText, setContractText] = useState([]);
  // 계약서의 서명을 추가하는 state
  const [contractSign, setContractSign] = useState({});
  // typing 디스플레이를 바꾸는 state
  const [htmlPage, setHtmlPage] = useState("title");

  // ____토큰을 사용하여 유저 정보를 가져오고 저장.
  useEffect(() => {
    // 문서 내용 유저정보에서 가져옴.
    const storedContractTitle = localStorage.getItem("contractMainTitle");
    const storedContractText = localStorage.getItem("contractText");
    const storedContractSign = localStorage.getItem("contractSign");

    if (storedContractTitle) {
      try {
        // 문서 타이틀 데이터 저장
        const parsedData = JSON.parse(storedContractTitle);
        setContractMainTitle(parsedData);
      } catch (error) {
        console.error("Parsing error:", error);
      }
    }

    if (storedContractText) {
      try {
        // 문서 내용 데이터 저장
        const parsedData = JSON.parse(storedContractText);
        setContractText(parsedData);
      } catch (error) {
        console.error("Parsing error:", error);
      }
    }

    if (storedContractSign) {
      try {
        // 문서 서명 데이터 저장
        const parsedData = JSON.parse(storedContractSign);
        setContractSign(parsedData);
      } catch (error) {
        console.error("Parsing error:", error);
      }
    }

    const token = Cookies.get("user_auth");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      saveUser(parsedUser);
      console.log("storedUser from localStorage:", parsedUser);
    } else if (token) {
      fetchUserFromToken(token).then((fetchedUser) => {
        saveUser(fetchedUser);
        console.log("fetchedUser from token:", fetchedUser);
      });
    }
  }, [user, saveUser]);

  // ____서버에서 토큰을 사용하여 유저 정보를 가져오는 함수
  const fetchUserFromToken = async (token) => {
    const response = await axios.get("/api/users/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  // ____작성중인 정보 로컬스토리지에 저장.
  // 제목
  const updateTitle = (title) => {
    setContractMainTitle(title);
    localStorage.setItem("contractMainTitle", JSON.stringify(title));
  };
  // 내용
  const updateContent = (content) => {
    setContractText(content);
    localStorage.setItem("contractText", JSON.stringify(content));
  };
  // 서명
  const updateSign = (sign) => {
    setContractSign(sign);
    localStorage.setItem("contractSign", JSON.stringify(sign));
  };

  if (user) {
    return (
      <>
        <AC.Wrapper>
          <Routes>
            <Route
              path="/"
              element={
                <AdminContractLayout
                  htmlPage={htmlPage}
                  setHtmlPage={setHtmlPage}
                  updateTitle={updateTitle}
                  updateContent={updateContent}
                  updateSign={updateSign}
                />
              }
            >
              <Route
                index
                element={
                  <AdminContractView
                    contractMainTitle={contractMainTitle}
                    contractText={contractText}
                    contractSign={contractSign}
                    user={user}
                    updateTitle={updateTitle}
                    updateContent={updateContent}
                    updateSign={updateSign}
                  />
                }
              />
              <Route
                path="/contractcheck"
                element={
                  <AdminContractCheck
                    contractMainTitle={contractMainTitle}
                    contractText={contractText}
                    contractSign={contractSign}
                    user={user}
                    updateTitle={updateTitle}
                    updateContent={updateContent}
                    updateSign={updateSign}
                  />
                }
              />
            </Route>
          </Routes>
        </AC.Wrapper>
      </>
    );
  } else {
    return (
      <>
        <h1>로그인 정보가 없습니다.</h1>
      </>
    );
  }
}

export default AdminContract1;

// need
// 1. 레이아웃 나누기 ---> grid를 써볼까요? V
// 2. 제 1 항 상위 부터 자동으로 카운트 적히게 V
// 3. 항목 추가한 걸 카운트 할 수 있게. V
// 4. 싸인 관련 설계하기.
// 5. jsPDF ===> react-pdf로 변경

// essue
// newContractText => 따로 컴포넌트를 만들어서 css 기깔나게 입힐까?
// 1. react-pdf 한글깨짐 문제 해결.  V ===> 폰트 ttf 등록
//    ===> 굷기 조정 필요. V
//    ===> 유저 정보가 pdf에 불러와지지않음. V ===> 답은 useContext가 아닌 Props로 받아와야 했음.

// 2. 프린트 후 취소하면 작성 한 사항 없어짐. ===> View컴포넌트 교체 후 고민 ===> react-pdf 사용시 굳이 필요 없을 수도??
// 3. 프리뷰 기능 활성화
// 4. 새로고침시 사라지는거 방지. ===> 새로고침시 작성중인거 그대로 유지.
