import React, { useRef, useState } from "react";

function AdminContract1() {
  const [contractText, setContractText] = useState("");

  const contractDescription = useRef("");
  const contractName = useRef("");
  const contractPage = useRef("");

  const contractSubmit = (e) => {
    e.preventDefault();
    try {
      const description = contractDescription.current.value;
      const name = contractName.current.value;
      const newContractText = `${contractText}\n\n${name}\n${description}`;

      setContractText(newContractText);

      contractDescription.current.value = "";
      contractName.current.value = "";
      console.log("내용 :", newContractText);
    } catch (err) {
      console.error("에러 메세지 :", err);
    }
  };

  return (
    <>
      <div>메뉴영역</div>
      <div>
        <form onSubmit={contractSubmit}>
          제 1 항
          <input ref={contractName} placeholder="항목 이름" />
          <textarea ref={contractDescription} placeholder="내용" />
          <button type="submit">항 추가</button>
        </form>
      </div>
      <div ref={contractPage}>
        <h2>문서 영역</h2>
        <pre>{contractText}</pre>
      </div>
    </>
  );
}

export default AdminContract1;

// 0. 프론트, 백엔드 동시 가동
// 1. 레이아웃 나누기
// 2. 제 1 항 상위 부터 자동으로 카운트 적히게
// 3. 출력한걸 카운트 할 수 있게.
// 4. 싸인 관련 설계하기.
