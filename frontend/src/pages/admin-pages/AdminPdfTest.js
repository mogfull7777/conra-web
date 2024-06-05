import React from "react";
import PDF from "./AdminContractView";
import * as AC from "./AdminPageCss";

function AdminPdfTest({ user, contractText }) {
  if (!user) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <>
      <AC.ContractView>
        <h1>PDF 미리보기</h1>
        <h3>반갑습니다! {user.name}</h3>
        <PDF user={user} contractText={contractText} />
      </AC.ContractView>
    </>
  );
}

export default AdminPdfTest;
