import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 다른 컴포넌트에서 유저의 정보를 다루기 위해 createContext 사용.

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const initialUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(initialUser);
  // 계약서의 메인 제목을 추가하는 state
  const [contractMainTitle, setContractMainTitle] = useState("");
  // 계약서의 항목을 추가하는 state
  const [contractText, setContractText] = useState("");
  // 계약서의 서명을 추가하는 state
  const [contractSign, setContractSign] = useState("");

  const navi = useNavigate();

  // 로그인 함수
  const loginUser = async (email, password, loginIdentity) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (
        (response.data.role !== 0 && loginIdentity === "사업자 로그인") ||
        (response.data.role !== 1 && loginIdentity === "고객 로그인")
      ) {
        await axios.get("http://localhost:5000/api/users/logout", {
          withCredentials: true,
        });
        alert("사업자 및 고객 로그인 선택을 확인해주세요.");
        return;
      } else if (response.data.loginSuccess) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.role === 0) {
          navi("/admin");
        } else if (response.data.role === 1) {
          navi("/client");
        }
        alert("로그인 성공!!!");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log("error : ", err);
      alert("로그인 실패: " + err.response.data.message);
    }
  };

  // 사용자의 인증 토큰을 받아 서버에 API요청.
  const fetchUserFromToken = async (token) => {
    const response = await axios.get("/api/users/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  };

  // 사용자 정보를 로컬 스토리지에 저장하는 함수
  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("user : ", user);
  };

  useEffect(() => {
    // 쿠키에서 사용자 정보를 불러오는 함수.
    const token = Cookies.get("user_auth");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("storedUser from localStorage:", parsedUser);
    } else if (token) {
      fetchUserFromToken(token)
        .then((fetchedUser) => {
          setUser(fetchedUser);
          localStorage.setItem("user", JSON.stringify(fetchedUser));
          console.log("fetchedUser from token:", fetchedUser);
        })
        .catch((err) => {
          console.error("토큰으로 유저 정보를 가져오지 못했습니다:", err);
        });
    }
  }, []);

  // 로그아웃 함수
  const logoutUser = () => {
    axios
      .get("http://localhost:5000/api/users/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("contractMainTitle");
        localStorage.removeItem("contractText");
        localStorage.removeItem("contractSign");
        setContractMainTitle({});
        setContractText([]);
        setContractSign({});
        alert("로그아웃 되었습니다.");
        navi("/login");
      })
      .catch((err) => {
        console.error("로그아웃 실패: ", err);
      });
  };

  // console.log("contractText :", contractText);
  // console.log("setContractText :", setContractText);

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        loginUser,
        logoutUser,
        contractMainTitle,
        setContractMainTitle,
        contractText,
        setContractText,
        contractSign,
        setContractSign,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// 여기서 user에 대한 정보를 어떻게 받아오는걸까?
