// import React, { useState, useEffect, useRef } from "react";
// import { createRoot } from "react-dom/client";
// import axios from "axios";
// import * as AC from "./AdminPageCss";
// import { useUser } from "../../UserContext";

// // JSX 요소의 높이를 계산하는 함수
// const addContentToPage = async (content, tempDiv) => {
//   return new Promise((resolve) => {
//     const root = createRoot(tempDiv);
//     root.render(content);
//     setTimeout(() => {
//       const height = tempDiv.offsetHeight;
//       root.unmount();
//       resolve(height);
//     }, 0);
//   });
// };

// // 요소를 페이지에 추가하는 함수
// const addElementToPage = async (
//   element,
//   tempDiv,
//   currentHeight,
//   paperHeight,
//   currentPageContent,
//   pageContent,
//   topMargin,
//   bottomMargin
// ) => {
//   const height = await addContentToPage(element, tempDiv);
//   console.log(
//     `Element height: ${height}, Current height: ${currentHeight}, Paper height: ${paperHeight}`
//   );
//   if (currentHeight + height > paperHeight - bottomMargin) {
//     pageContent.push([...currentPageContent]);
//     currentPageContent = [];
//     currentHeight = topMargin; // 새로운 페이지의 시작 높이에 상단 여백 추가
//   }

//   currentPageContent.push(element);
//   currentHeight += height;
//   return { currentPageContent, currentHeight, pageContent };
// };

// const AdminContractView = ({
//   contractMainTitle,
//   contractText,
//   contractSign,
//   updateTitle,
//   updateContent,
//   updateSign,
// }) => {
//   const { setContractMainTitle, setContractText, setContractSign } = useUser();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pages, setPages] = useState([]);

//   const paperRef = useRef(null);

//   useEffect(() => {
//     // ____페이지 나누는 함수.
//     const splitPages = async () => {
//       let pageContent = [];
//       let currentPageContent = [];
//       let currentHeight = 0;
//       const topMargin = 20; // 상단 여백
//       const bottomMargin = 20; // 하단 여백
//       const paperHeight = paperRef.current.offsetHeight * 0.8; // 여백을 고려한 높이

//       const tempDiv = document.createElement("div");
//       tempDiv.style.position = "absolute";
//       tempDiv.style.visibility = "hidden";
//       document.body.appendChild(tempDiv);

//       currentHeight += topMargin; // 상단 여백 추가

//       // 1. _____타이틀 요소 구축
//       if (contractMainTitle.title) {
//         const titleElement = (
//           <div>
//             <AC.ContractPaperTitle>
//               {contractMainTitle.title}
//             </AC.ContractPaperTitle>
//             <AC.ContractPaperSubTitle>
//               {contractMainTitle.clientName}(이하 "발주처라 함")과
//               {contractMainTitle.adminName}(이하 "수주처"라 함)은
//               <br />
//               {contractMainTitle.content}와 관련한 계약을 다름과 같이 체결한다.
//             </AC.ContractPaperSubTitle>
//           </div>
//         );

//         const result = await addElementToPage(
//           titleElement,
//           tempDiv,
//           currentHeight,
//           paperHeight,
//           currentPageContent,
//           pageContent,
//           topMargin,
//           bottomMargin
//         );
//         currentPageContent = result.currentPageContent;
//         currentHeight = result.currentHeight;
//         pageContent = result.pageContent;
//       }

//       // 2. _____항목 내용 요소 구축
//       for (const [index, item] of contractText.entries()) {
//         const contentElement = (
//           <AC.ContractPaperContractList
//             key={index}
//             style={{ wordBreak: "break-all" }}
//           >
//             <AC.ContractPaperContractContext>
//               [ 제 {index + 1} 조 ]
//               <AC.ContractPaperContractTitle>
//                 {item.name}
//               </AC.ContractPaperContractTitle>
//             </AC.ContractPaperContractContext>
//             <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
//           </AC.ContractPaperContractList>
//         );

//         const result = await addElementToPage(
//           contentElement,
//           tempDiv,
//           currentHeight,
//           paperHeight,
//           currentPageContent,
//           pageContent,
//           topMargin,
//           bottomMargin
//         );
//         currentPageContent = result.currentPageContent;
//         currentHeight = result.currentHeight;
//         pageContent = result.pageContent;
//       }

//       // 3. _____서명 요소 구축
//       if (contractSign.company) {
//         const signElement = (
//           <ul>
//             <AC.ContractPaperContractList>
//               <p>{contractSign.company}</p>
//               <p>{contractSign.adrass}</p>
//               <p>{contractSign.CEO}</p>
//               <p>{contractSign.phone}</p>
//               <p>{contractSign.accountNumber}</p>
//               <div>서명하는 곳</div>
//               {contractSign.dataUrl && (
//                 <img src={contractSign.dataUrl} alt="signature" />
//               )}
//             </AC.ContractPaperContractList>
//           </ul>
//         );
//         const result = await addElementToPage(
//           signElement,
//           tempDiv,
//           currentHeight,
//           paperHeight,
//           currentPageContent,
//           pageContent,
//           topMargin,
//           bottomMargin
//         );
//         currentPageContent = result.currentPageContent;
//         currentHeight = result.currentHeight;
//         pageContent = result.pageContent;
//       }

//       if (currentPageContent.length > 0) {
//         pageContent.push([...currentPageContent]);
//       }

//       document.body.removeChild(tempDiv);
//       setPages(pageContent);
//     };

//     splitPages();
//   }, [contractMainTitle, contractText, contractSign]);

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, pages.length - 1));
//   };

//   // ___문서 유저 데이터에 저장
//   const saveDocument = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/users/saveContract",
//         {
//           document: {
//             title: contractMainTitle,
//             content: contractText,
//             sign: contractSign,
//           },
//         },
//         { withCredentials: true }
//       );
//       if (response.data.success) {
//         alert("문서가 저장되었습니다.");

//         setContractMainTitle({});
//         setContractText([]);
//         setContractSign({});

//         updateTitle({});
//         updateContent([]);
//         updateSign({});
//       } else {
//         alert("문서 저장에 실패했습니다.");
//       }
//     } catch (err) {
//       console.error("문서 저장 실패: ", err);
//       alert("문서 저장 도중 에러가 발생했습니다.");
//     }
//   };

//   return (
//     <>
//       <AC.ContractView>
//         <AC.ContractPaper>
//           <AC.ContractPaperTextView ref={paperRef}>
//             {pages[currentPage]?.map((content, index) => (
//               <React.Fragment key={index}>{content}</React.Fragment>
//             ))}
//           </AC.ContractPaperTextView>
//         </AC.ContractPaper>
//         <div>
//           <button onClick={handlePrevPage} disabled={currentPage === 0}>
//             이전 페이지
//           </button>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === pages.length - 1}
//           >
//             다음 페이지
//           </button>
//         </div>
//         <button onClick={saveDocument}>저장</button>
//       </AC.ContractView>
//     </>
//   );
// };

// export default AdminContractView;

// -------------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import * as AC from "./AdminPageCss";
import { useUser } from "../../UserContext";

const measureElementHeight = async (element) => {
  return new Promise((resolve) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.visibility = "hidden";
    tempDiv.style.width = "90%"; // ContractPaperTextView의 width와 일치시키기
    document.body.appendChild(tempDiv);
    const root = createRoot(tempDiv);
    root.render(element);
    setTimeout(() => {
      const height = tempDiv.offsetHeight;
      root.unmount();
      document.body.removeChild(tempDiv);
      resolve(height);
    }, 100); // 약간의 지연을 추가하여 실제 렌더링을 보장
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

  const textViewRef = useRef(null);

  useEffect(() => {
    const splitPages = async () => {
      if (!textViewRef.current) return; // textViewRef가 존재하는지 확인

      let pageContent = [];
      let currentPageContent = [];
      let currentHeight = 0;

      const textViewHeight = textViewRef.current.offsetHeight;

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

        const height = await measureElementHeight(titleElement);
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

        const height = await measureElementHeight(contentElement);
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

        const height = await measureElementHeight(signElement);
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
  }, [contractMainTitle, contractText, contractSign]);

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

// -------------------------------------------------------------

// import React, { useEffect, useRef } from "react";
// import { createRoot } from "react-dom/client";
// import * as AC from "./AdminPageCss";

// // JSX 요소의 높이를 계산하는 함수
// const addContentToPage = async (content, tempDiv) => {
//   return new Promise((resolve) => {
//     const root = createRoot(tempDiv); // 임시 div에 React 루트를 생성
//     root.render(content); // 전달된 JSX 요소를 렌더링
//     setTimeout(() => {
//       // 렌더링이 완료될 때까지 기다림.
//       const height = tempDiv.offsetHeight; // tempDiv의 높이 측정
//       root.unmount(); // 렌더링한 요소를 언마운트하여 제거
//       resolve(height); // 높이 반환.
//     }, 0);
//   });
// };

// // 요소를 페이지에 추가하는 함수
// const logElementHeight = async (
//   element, // 추가할 JSX 요소.
//   tempDiv // 임시로 요소를 추가할 숨겨진 'div' 요소.
// ) => {
//   const height = await addContentToPage(element, tempDiv);
//   console.log(`Element height: ${height}`);
// };

// const AdminContractView = ({
//   contractMainTitle,
//   contractText,
//   contractSign,
// }) => {
//   const paperRef = useRef(null);
//   const textViewRef = useRef(null);

//   useEffect(() => {
//     const logHeights = () => {
//       if (paperRef.current && textViewRef.current) {
//         console.log(`ContractPaper height: ${paperRef.current.offsetHeight}`);
//         console.log(
//           `ContractPaperTextView height: ${textViewRef.current.offsetHeight}`
//         );
//       }
//     };

//     logHeights(); // Initial log

//     const tempDiv = document.createElement("div");
//     tempDiv.style.position = "absolute";
//     tempDiv.style.visibility = "hidden";
//     document.body.appendChild(tempDiv);

//     if (contractMainTitle.title) {
//       const titleElement = (
//         <div>
//           <AC.ContractPaperTitle>
//             {contractMainTitle.title}
//           </AC.ContractPaperTitle>
//           <AC.ContractPaperSubTitle>
//             {contractMainTitle.clientName}(이하 "발주처라 함")과
//             {contractMainTitle.adminName}(이하 "수주처"라 함)은
//             <br />
//             {contractMainTitle.content}와 관련한 계약을 다름과 같이 체결한다.
//           </AC.ContractPaperSubTitle>
//         </div>
//       );
//       logElementHeight(titleElement, tempDiv);
//     }

//     for (const [index, item] of contractText.entries()) {
//       const contentElement = (
//         <AC.ContractPaperContractList
//           key={index}
//           style={{ wordBreak: "break-all" }}
//         >
//           <AC.ContractPaperContractContext>
//             [ 제 {index + 1} 조 ]
//             <AC.ContractPaperContractTitle>
//               {item.name}
//             </AC.ContractPaperContractTitle>
//           </AC.ContractPaperContractContext>
//           <AC.ContractPaperText>{item.description}</AC.ContractPaperText>
//         </AC.ContractPaperContractList>
//       );
//       logElementHeight(contentElement, tempDiv);
//     }

//     if (contractSign.company) {
//       const signElement = (
//         <ul>
//           <AC.ContractPaperContractList>
//             <p>{contractSign.company}</p>
//             <p>{contractSign.adrass}</p>
//             <p>{contractSign.CEO}</p>
//             <p>{contractSign.phone}</p>
//             <p>{contractSign.accountNumber}</p>
//             <div>서명하는 곳</div>
//             {contractSign.dataUrl && (
//               <img src={contractSign.dataUrl} alt="signature" />
//             )}
//           </AC.ContractPaperContractList>
//         </ul>
//       );
//       logElementHeight(signElement, tempDiv);
//     }

//     document.body.removeChild(tempDiv);
//   }, [contractMainTitle, contractText, contractSign]);

//   return (
//     <>
//       <AC.ContractView>
//         <AC.ContractPaper ref={paperRef}>
//           <AC.ContractPaperTextView ref={textViewRef}>
//             {/* 기존 요소 렌더링 로직 */}
//           </AC.ContractPaperTextView>
//         </AC.ContractPaper>
//       </AC.ContractView>
//     </>
//   );
// };

// export default AdminContractView;
