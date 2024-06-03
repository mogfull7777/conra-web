import React from "react";
import PDF from "./AdminContractPdf";
import { useUser } from "../../UserContext";

function AdminPdfTest() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <>
      <h1>PDF 미리보기</h1>
      <h3>반갑습니다! {user.name}</h3>
      <PDF user={user} />
    </>
  );
}

export default AdminPdfTest;
