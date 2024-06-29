import React, { useState, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import * as AC from "./AdminPageCss";
import axios from "axios";
import { useUser } from "../../UserContext";

// 임시로 DOM 요소를 생성하여 해당 요소의 높이를 측정하는 헬퍼 함수
const measureElementHeight = async (element, containerWidth) => {
  return new Promise((resolve) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.width = `${containerWidth}px`;
    tempDiv.style.visibility = "hidden";
    document.body.appendChild(tempDiv);
    const root = createRoot(tempDiv);

    root.render(element);

    setTimeout(() => {
      const height = tempDiv.offsetHeight;
      root.unmount();
      document.body.removeChild(tempDiv);
      resolve(height);
    }, 100);
  });
};

const AdminContractView = ({
  // 상태 관리 부분
  contractMainTitle,
  contractText,
  contractSign,
  updateTitle,
  updateContent,
  updateSign,
}) => {
  const { setContractMainTitle, setContractText, setContractSign } = useUser();
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태
  const [pages, setPages] = useState([]); // 페이지 목록 상태
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  }); // 컨테이너 크기 상태

  const textViewRef = useRef(null); // 텍스트 뷰 레퍼런스

  // 리사이즈 핸들러 함수
  const handleResize = useCallback(() => {
    if (textViewRef.current) {
      const { offsetWidth, offsetHeight } = textViewRef.current;
      return { width: offsetWidth, height: offsetHeight };
    }
    return { width: 0, height: 0 };
  }, []);

  useEffect(() => {
    const currentRef = textViewRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const dimensions = handleResize(); // 크기 측정
      setContainerDimensions(dimensions); // 크기 상태 업데이트
    });

    if (currentRef) {
      resizeObserver.observe(currentRef); // 크기 변화 관찰
    }

    const dimensions = handleResize(); // 초기 크기 측정
    setContainerDimensions(dimensions); // 초기 크기 상태 설정

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef); // 컴포넌트 언마운트 시 관찰 중지
      }
    };
  }, [handleResize]);

  const handleEdit = useCallback(
    (index) => {
      const item = contractText[index];
      const newName = prompt("수정할 항목의 제목을 입력하세요", item.name); // 항목 제목 수정
      const newDescription = prompt(
        "수정할 내용을 입력하세요",
        item.description
      ); // 항목 내용 수정
      if (newName !== null && newDescription !== null) {
        const updatedText = [...contractText];
        updatedText[index] = {
          ...item,
          name: newName,
          description: newDescription,
        };
        setContractText(updatedText); // 수정된 내용 상태 업데이트
        updateContent(updatedText); // 수정된 내용 부모 컴포넌트로 전달
      }
    },
    [contractText, updateContent, setContractText]
  );

  const handleDelete = useCallback(
    (index) => {
      const updatedText = contractText.filter((_, i) => i !== index); // 항목 삭제
      setContractText(updatedText); // 삭제된 내용 상태 업데이트
      updateContent(updatedText); // 삭제된 내용 부모 컴포넌드로 전달
    },
    [contractText, updateContent, setContractText]
  );

  // 페이지 분리
  useEffect(() => {
    const splitPages = async () => {
      if (!textViewRef.current) return;

      const { width, height } = handleResize();
      let pageContent = [];
      let currentPageContent = [];
      let currentHeight = 0;

      if (contractMainTitle.title) {
        const titleElement = (
          <div>
            <AC.ContractPaperTitle>
              {contractMainTitle.title}
            </AC.ContractPaperTitle>
            <AC.ContractPaperSubTitle>
              {contractMainTitle.clientName}
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "calc(0.1rem + 0.5vw)",
                }}
              >
                (이하 "발주처라 함")과
              </span>
              {contractMainTitle.adminName}
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "calc(0.1rem + 0.5vw)",
                }}
              >
                (이하 "수주처"라 함)은
              </span>
              {contractMainTitle.content}
              <span
                style={{
                  fontWeight: "normal",
                  fontSize: "calc(0.1rem + 0.5vw)",
                }}
              >
                와 관련한 계약을 다름과 같이 체결한다.
              </span>
            </AC.ContractPaperSubTitle>
          </div>
        );

        const titleHeight = await measureElementHeight(titleElement, width);

        if (currentHeight + titleHeight > height) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(titleElement); // 제목 요소 추가
        currentHeight += titleHeight;
      }

      for (const [index, item] of contractText.entries()) {
        // 계약서 항목 추가
        const contentElement = (
          <AC.ContractPaperContractList key={index}>
            <AC.ContentPaperTextPosition>
              <AC.ContractPaperContractContext>
                [ 제 {index + 1} 조 ]
                <AC.ContractPaperContractTitle>
                  {item.name}
                </AC.ContractPaperContractTitle>
              </AC.ContractPaperContractContext>
              <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
            </AC.ContentPaperTextPosition>
            <AC.ContractCRUD>
              <AC.ContractCRUDBtn onClick={() => handleEdit(index)}>
                수정
              </AC.ContractCRUDBtn>
              <AC.ContractCRUDBtn onClick={() => handleDelete(index)}>
                삭제
              </AC.ContractCRUDBtn>
            </AC.ContractCRUD>
          </AC.ContractPaperContractList>
        );

        const contentHeight = await measureElementHeight(contentElement, width);

        if (currentHeight + contentHeight > height) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(contentElement); // 항목 요소 추가
        currentHeight += contentHeight;
      }

      if (contractSign.company) {
        // 계약서 서명 추가
        const signElement = (
          <ul>
            <AC.ContractPaperContractList>
              <AC.ContractPaperText>
                {contractSign.company}
              </AC.ContractPaperText>
              <AC.ContractPaperText>{contractSign.adrass}</AC.ContractPaperText>
              <AC.ContractPaperText>{contractSign.CEO}</AC.ContractPaperText>
              <AC.ContractPaperText>{contractSign.phone}</AC.ContractPaperText>
              <AC.ContractPaperText>
                {contractSign.accountNumber}
              </AC.ContractPaperText>
              <div>서명하는 곳</div>
              {contractSign.dataUrl && (
                <img src={contractSign.dataUrl} alt="signature" />
              )}
            </AC.ContractPaperContractList>
          </ul>
        );

        const signHeight = await measureElementHeight(signElement, width);

        if (currentHeight + signHeight > height) {
          pageContent.push([...currentPageContent]);
          currentPageContent = [];
          currentHeight = 0;
        }

        currentPageContent.push(signElement); // 서명 요소 추가
        currentHeight += signHeight;
      }

      if (currentPageContent.length > 0) {
        pageContent.push([...currentPageContent]); // 마지막 페이지 추가
      }

      setPages(pageContent); // 페이지 상태 업데이트
    };

    splitPages();
  }, [
    contractMainTitle,
    contractText,
    contractSign,
    handleEdit,
    handleDelete,
    handleResize,
  ]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0)); // 이전 페이지로 이동
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1)); // 다음 페이지로 이동
  };

  // 문서 내용 유저데이터로 전달 및 저장
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
    <AC.ContractView>
      <AC.ContractPaper>
        <AC.ContractPaperTextView ref={textViewRef}>
          {pages[currentPage]?.map((content, index) => (
            <React.Fragment key={index}>{content}</React.Fragment>
          ))}
        </AC.ContractPaperTextView>
      </AC.ContractPaper>
      <AC.ContractPageBtnBox>
        <AC.ContractPageBtn
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          이전 페이지
        </AC.ContractPageBtn>
        <AC.ContractPageBtn onClick={saveDocument}>저장</AC.ContractPageBtn>
        <AC.ContractPageBtn
          onClick={handleNextPage}
          disabled={currentPage === pages.length - 1}
        >
          다음 페이지
        </AC.ContractPageBtn>
      </AC.ContractPageBtnBox>
    </AC.ContractView>
  );
};

export default AdminContractView;
