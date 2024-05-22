import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 불러오는 함수.
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 사용자 정보를 로컬 스토리지에 저장하는 함수
  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // 로그아웃 시 사용자 정보를 로컬 스토리지에서 삭제하는 함수
  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// 여기서 user에 대한 정보를 어떻게 받아오는걸까?
