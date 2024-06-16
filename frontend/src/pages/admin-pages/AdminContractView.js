import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

// JSX 요소의 높이를 계산하는 함수
const addContentToPage = async (content, tempDiv) => {
  return new Promise((resolve) => {
    const root = createRoot(tempDiv);
    root.render(content);
    setTimeout(() => {
      const height = tempDiv.offsetHeight;
      root.unmount();
      resolve(height);
    }, 0);
  });
};

// 요소를 페이지에 추가하는 함수
const addElementToPage = async (
  element,
  tempDiv,
  currentHeight,
  paperHeight,
  currentPageContent,
  pageContent,
  topMargin,
  bottomMargin
) => {
  const height = await addContentToPage(element, tempDiv);
  console.log(
    `Element height: ${height}, Current height: ${currentHeight}, Paper height: ${paperHeight}`
  );
  if (currentHeight + height > paperHeight - bottomMargin) {
    pageContent.push([...currentPageContent]);
    currentPageContent = [];
    currentHeight = topMargin; // 새로운 페이지의 시작 높이에 상단 여백 추가
  }

  currentPageContent.push(element);
  currentHeight += height;
  return { currentPageContent, currentHeight, pageContent };
};

const AdminContractView = ({
  contractMainTitle,
  contractText,
  contractSign,
  updateTitle,
  updateContent,
  updateSign,
}) => {
  const { setContractMainTitle, setContractText, setContractSign } = useUser();
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  const paperRef = useRef(null);

  useEffect(() => {
    const splitPages = async () => {
      let pageContent = [];
      let currentPageContent = [];
      let currentHeight = 0;
      const topMargin = 20; // 상단 여백
      const bottomMargin = 20; // 하단 여백
      const paperHeight = paperRef.current.offsetHeight * 0.8; // 여백을 고려한 높이

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      document.body.appendChild(tempDiv);

      currentHeight += topMargin; // 상단 여백 추가

      if (contractMainTitle.title) {
        const titleElement = (
          <div>
            <AC.ContractPaperTitle>
              {contractMainTitle.title}
            </AC.ContractPaperTitle>
            <AC.ContractPaperSubTitle>
              {contractMainTitle.clientName}(이하 "발주처라 함")과
              {contractMainTitle.adminName}(이하 "수주처"라 함)은
              <br />
              {contractMainTitle.content}와 관련한 계약을 다름과 같이 체결한다.
            </AC.ContractPaperSubTitle>
          </div>
        );

        const result = await addElementToPage(
          titleElement,
          tempDiv,
          currentHeight,
          paperHeight,
          currentPageContent,
          pageContent,
          topMargin,
          bottomMargin
        );
        currentPageContent = result.currentPageContent;
        currentHeight = result.currentHeight;
        pageContent = result.pageContent;
      }

      for (const [index, item] of contractText.entries()) {
        const contentElement = (
          <AC.ContractPaperContractList
            key={index}
            style={{ wordBreak: "break-all" }}
          >
            <AC.ContractPaperContractContext>
              [ 제 {index + 1} 조 ]
              <AC.ContractPaperContractTitle>
                {item.name}
              </AC.ContractPaperContractTitle>
            </AC.ContractPaperContractContext>
            <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
          </AC.ContractPaperContractList>
        );

        const result = await addElementToPage(
          contentElement,
          tempDiv,
          currentHeight,
          paperHeight,
          currentPageContent,
          pageContent,
          topMargin,
          bottomMargin
        );
        currentPageContent = result.currentPageContent;
        currentHeight = result.currentHeight;
        pageContent = result.pageContent;
      }

      if (contractSign.company) {
        const signElement = (
          <ul>
            <AC.ContractPaperContractList>
              <p>{contractSign.company}</p>
              <p>{contractSign.adrass}</p>
              <p>{contractSign.CEO}</p>
              <p>{contractSign.phone}</p>
              <p>{contractSign.accountNumber}</p>
              <div>서명하는 곳</div>
              {contractSign.dataUrl && (
                <img src={contractSign.dataUrl} alt="signature" />
              )}
            </AC.ContractPaperContractList>
          </ul>
        );
        const result = await addElementToPage(
          signElement,
          tempDiv,
          currentHeight,
          paperHeight,
          currentPageContent,
          pageContent,
          topMargin,
          bottomMargin
        );
        currentPageContent = result.currentPageContent;
        currentHeight = result.currentHeight;
        pageContent = result.pageContent;
      }

      if (currentPageContent.length > 0) {
        pageContent.push([...currentPageContent]);
      }

      document.body.removeChild(tempDiv);
      setPages(pageContent);
    };

    splitPages();
  }, [contractMainTitle, contractText, contractSign]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

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
        <AC.ContractPaper ref={paperRef}>
          <AC.ContractPaperTextView>
            {pages[currentPage]?.map((content, index) => (
              <React.Fragment key={index}>{content}</React.Fragment>
            ))}
          </AC.ContractPaperTextView>
        </AC.ContractPaper>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            이전 페이지
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
          >
            다음 페이지
          </button>
        </div>
        <button onClick={saveDocument}>저장</button>
      </AC.ContractView>
    </>
  );
};

export default AdminContractView;
