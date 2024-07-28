import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./UserContext";

// page 라우팅
import Main from "./pages/Main";
import LoginPage from "./pages/LoginPage";
import AdminMain from "./pages/admin-pages/AdminMain";
import ClientMain from "./pages/client-pages/ClientMain";
import SignupPage from "./pages/SignupPage";
import AdminContract1 from "./pages/admin-pages/AdminContract1";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/client" element={<ClientMain />} />
        <Route path="/admin/contract/new" element={<AdminContract1 />} />
        <Route path="/admin/contract/:id" element={<AdminContract1 />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

// 1. 회원가입 및 로그인 기능.
// 2. 페이지 내에 텍스트를 넣으면 1항 2항 추가 가능하게 기능.
// 3. jpg 등록 기능.
