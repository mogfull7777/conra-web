import { React, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as AC from "./AdminPageCss";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";

// 글꼴 굷기 정렬
import NotoSansKR100 from "../../fonts/NotoSansKR-Thin.ttf";
import NotoSansKR200 from "../../fonts/NotoSansKR-ExtraLight.ttf";
import NotoSansKR300 from "../../fonts/NotoSansKR-Light.ttf";
import NotoSansKR400 from "../../fonts/NotoSansKR-Medium.ttf";
import NotoSansKR500 from "../../fonts/NotoSansKR-Regular.ttf";
import NotoSansKR600 from "../../fonts/NotoSansKR-SemiBold.ttf";
import NotoSansKR700 from "../../fonts/NotoSansKR-Bold.woff";
import NotoSansKR800 from "../../fonts/NotoSansKR-ExtraBold.ttf";
import NotoSansKR900 from "../../fonts/NotoSansKR-Black.ttf";
import { useUser } from "../../UserContext";

Font.register({
  family: "NotoSansKR",
  fonts: [
    { src: NotoSansKR100, fontStyle: 100 },
    { src: NotoSansKR200, fontStyle: 200 },
    { src: NotoSansKR300, fontStyle: 300 },
    { src: NotoSansKR400, fontStyle: 400 },
    { src: NotoSansKR500, fontStyle: 500 },
    { src: NotoSansKR600, fontStyle: 600 },
    { src: NotoSansKR700, fontStyle: 700 },
    { src: NotoSansKR800, fontStyle: 800 },
    { src: NotoSansKR900, fontStyle: 900 },
  ],
});

// 스타일 생성
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "NotoSansKR",
    fontStyle: 300,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  titleNum: {
    fontSize: "15px",
    fontWeight: "normal",
    fontStyle: 200,
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    fontStyle: 200,
  },
  preview: {
    fontSize: "11px",
    fontWeight: "normal",
    fontStyle: 200,
  },
});

// ____PDF
function PDF({ contractMainTitle, contractText, contractSign }) {
  // 문서 영역
  const contractPage = useRef("");

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} ref={contractPage}>
          <View style={styles.section}>
            <Text>계약서 내용</Text>
            <Text style={styles.preview}>{contractMainTitle.title}</Text>
            <Text style={styles.preview}>
              {contractMainTitle.clientName}(이하 "발주처라 함")과
              {contractMainTitle.adminName}(이하 "수주처"라 함)은
              {contractMainTitle.content}와 관련한 계약을 다름과 같이 체결한다.
            </Text>
            {contractText.map((item, index) => (
              <>
                <Text style={styles.title}>
                  <Text style={styles.titleNum}>[ 제 {index + 1} 조 ]</Text>
                  {item.name}
                </Text>
                <Text style={styles.preview}>{item.description}</Text>
              </>
            ))}
            <Text style={styles.preview}>{contractSign.company}</Text>
            <Text style={styles.preview}>{contractSign.adrass}</Text>
            <Text style={styles.preview}>{contractSign.CEO}</Text>
            <Text style={styles.preview}>{contractSign.phone}</Text>
            <Text style={styles.preview}>{contractSign.accountNumber}</Text>
            {contractSign.dataUrl && (
              <Image src={contractSign.dataUrl} alt="signature" />
            )}
          </View>
        </Page>
      </Document>
    </>
  );
}

const AdminContractCheck = ({
  user,
  contractMainTitle,
  contractText,
  contractSign,
  updateTitle,
  updateContent,
  updateSign,
}) => {
  const navi = useNavigate();
  const { setContractMainTitle, setContractText, setContractSign } = useUser();

  // 문서 유저 데이터에 저장
  const saveDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/saveContract",
        { document: contractMainTitle, contractText, contractSign },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("문서가 저장되었습니다.");
        navi("/admin");
        console.log("타이틀 내용 :", contractMainTitle);
        console.log("문서 내용 :", contractText);
        console.log("서명 내용 :", contractSign);
        // 로컬 스토리지 문서 백지화.
        setContractMainTitle({});
        setContractText([]);
        setContractSign({});
        updateTitle({});
        updateContent([]);
        updateSign([]);
      } else {
        alert("문서 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("문서 저장 실패: ", err);
      alert("문서 저장 도중 에러가 발생했습니다.");
    }
  };

  // 자 여긴 HTML 페이지가 되는거고 nav에 pdf 뷰어 버튼 다는겁니다잉 06.11
  return (
    <AC.ContractView>
      <PDFViewer
        style={{
          width: "85%",
          maxWidth: "210mm",
          aspectRatio: "210 / 297",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "9%",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <PDF
          user={user}
          contractMainTitle={contractMainTitle}
          contractText={contractText}
          contractSign={contractSign}
        />
      </PDFViewer>
      <button onClick={saveDocument}>저장</button>
    </AC.ContractView>
  );
};

export default AdminContractCheck;
