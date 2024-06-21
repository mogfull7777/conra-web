import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import * as AC from "./AdminPageCss";
import axios from "axios";
import { useUser } from "../../UserContext";

// 요소의 높이를 측정하는 헬퍼 함수
const measureElementHeight = async (element, containerWidth) => {
  return new Promise((resolve) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.width = `${containerWidth}px`; // 동적으로 가져온 너비 적용
    if (containerHeight) {
      tempDiv.style.maxHeight = `${containerHeight}px`; // 필요에 따라 최대 높이 설정
      tempDiv.style.overflow = "auto"; // 높이를 넘는 내용은 스크롤 처리
    }
    tempDiv.style.wordBreak = "break-all";
    document.body.appendChild(tempDiv);
    const root = createRoot(tempDiv);

    root.render(element);

    setTimeout(() => {
      const height = tempDiv.offsetHeight;
      root.unmount();
      document.body.removeChild(tempDiv);
      resolve(height);
    }, 100); // 높이를 측정하기 전 짧은 지연 시간
  });
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
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });

  const textViewRef = useRef(null);

  // 리사이즈 핸들러 함수
  const handleResize = () => {
    if (textViewRef.current) {
      setContainerDimensions({
        width: textViewRef.current.offsetWidth,
        height: textViewRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    // ResizeObserver 설정
    const resizeObserver = new ResizeObserver(() => handleResize());
    const currentRef = textViewRef.current;
    if (currentRef) {
      resizeObserver.observe(currentRef);
    }
    // 초기 측정
    handleResize();

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [textViewRef]);

  useEffect(() => {
    const splitPages = async () => {
      if (!textViewRef.current) return;

      let pageContent = [];
      let currentPageContent = [];
      let currentHeight = 0;
      const textViewHeight = containerDimensions.height;

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

        const height = await measureElementHeight(
          titleElement,
          containerDimensions.width
        );

        if (currentHeight + height > textViewHeight) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(titleElement);
        currentHeight += height;
      }

      for (const [index, item] of contractText.entries()) {
        const contentElement = (
          <AC.ContractPaperContractList key={index}>
            <AC.ContractPaperContractContext>
              [ 제 {index + 1} 조 ]
              <AC.ContractPaperContractTitle>
                {item.name}
              </AC.ContractPaperContractTitle>
            </AC.ContractPaperContractContext>
            <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
          </AC.ContractPaperContractList>
        );

        const height = await measureElementHeight(
          contentElement,
          containerDimensions.width
        );

        if (currentHeight + height > textViewHeight) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(contentElement);
        currentHeight += height;
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

        const height = await measureElementHeight(
          signElement,
          containerDimensions.width
        );

        if (currentHeight + height > textViewHeight) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(signElement);
        currentHeight += height;
      }

      if (currentPageContent.length > 0) {
        pageContent.push([...currentPageContent]);
      }

      setPages(pageContent);
    };

    splitPages();
  }, [contractMainTitle, contractText, contractSign, containerDimensions]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
  };

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
        <AC.ContractPaper>
          <AC.ContractPaperTextView ref={textViewRef}>
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
