import { React } from "react";
import axios from "axios";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

const AdminContractView = ({
  contractMainTitle,
  contractText,
  contractSign,
  updateTitle,
  updateContent,
  updateSign,
}) => {
  const { setContractMainTitle, setContractText, setContractSign } = useUser();

  console.log("contractMainTitle :", contractMainTitle);
  console.log("contractText :", contractText);
  console.log("contractSign :", contractSign);

  // 문서 유저 데이터에 저장
  const saveDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/saveContract",
        {
          document: {
            title: contractMainTitle,
            content: contractText,
            sign: contractSign,
          },
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("문서가 저장되었습니다.");

        console.log("타이틀 내용 :", contractMainTitle);
        console.log("문서 내용 :", contractText);
        console.log("서명 내용 :", contractSign);

        // 로컬 스토리지 문서 백지화.
        setContractMainTitle({});
        setContractText([]);
        setContractSign({});

        updateTitle({});
        updateContent([]);
        updateSign({});
      } else {
        alert("문서 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("문서 저장 실패: ", err);
      alert("문서 저장 도중 에러가 발생했습니다.");
    }
  };

  return (
    <>
      <AC.ContractView>
        <AC.ContractPaper>
          <AC.ContractPaperTitle>
            {contractMainTitle.title}
          </AC.ContractPaperTitle>
          <AC.ContractPaperSubTitle>
            {contractMainTitle.clientName}(이하 "발주처라 함")과
            {contractMainTitle.adminName}(이하 "수주처"라 함)은
            <br />
            {contractMainTitle.content}와 관련한 계약을 다름과 같이 체결한다.
          </AC.ContractPaperSubTitle>
          <ol>
            {contractText.map((item, index) => (
              <li key={index}>
                <AC.ContractPaperContractContext>
                  [ 제 {index + 1} 항 ]
                  <AC.ContractPaperContractTitle>
                    {item.name}
                  </AC.ContractPaperContractTitle>
                </AC.ContractPaperContractContext>
                <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
              </li>
            ))}
          </ol>
          <ul>
            <li>
              <p>{contractSign.company}</p>
              <p>{contractSign.adrass}</p>
              <p>{contractSign.CEO}</p>
              <p>{contractSign.phone}</p>
              <p>{contractSign.accountNumber}</p>
              <div>서명하는 곳</div>
              {contractSign.dataUrl && (
                <img src={contractSign.dataUrl} alt="signature" />
              )}
            </li>
          </ul>
        </AC.ContractPaper>
        <button onClick={saveDocument}>저장</button>
      </AC.ContractView>
    </>
  );
};

export default AdminContractView;
