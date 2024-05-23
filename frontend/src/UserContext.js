import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 다른 컴포넌트에서 유저의 정보를 다루기 위해 createContext 사용.

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navi = useNavigate();

  useEffect(() => {
    // 쿠키에서 사용자 정보를 불러오는 함수.
    const token = Cookies.get("user_auth");
    if (token) {
      axios
        .get("/api/users/auth", { withCredentials: true })
        .then((response) => {
          if (response.data.isAuth) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

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
      } else if (loginIdentity === "비회원 로그인") {
        await axios.get("http://localhost:5000/api/users/logout", {
          withCredentials: true,
        });
        alert("사업자 및 고객 로그인 선택을 확인해주세요.");
        return;
      } else if (response.data.loginSuccess) {
        setUser(response.data);
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

  // 로그아웃 함수
  const logoutUser = () => {
    axios
      .get("http://localhost:5000/api/users/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        alert("로그아웃 되었습니다.");
        navi("/login");
      })
      .catch((err) => {
        console.error("로그아웃 실패: ", err);
      });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// 여기서 user에 대한 정보를 어떻게 받아오는걸까?
