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
  preview: {
    fontSize: "11px",
    fontWeight: "normal",
    fontStyle: 200,
  },
});

// ____PDF
function PDF({ contractText }) {
  // 문서 영역
  const contractPage = useRef("");

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} ref={contractPage}>
          <View style={styles.section}>
            <Text>계약서 내용</Text>
            <Text style={styles.preview}>this is preview</Text>
            <Text style={styles.preview}>{contractText}</Text>
          </View>
        </Page>
      </Document>
    </>
  );
}

const AdminContractView = ({ user, contractText, updatePreview }) => {
  const navi = useNavigate();
  const { setContractText } = useUser();

  // 문서 유저 데이터에 저장
  const saveDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/saveContract",
        { document: contractText },
        { withCredentials: true }
      );
      if (response.data.success) {
        alert("문서가 저장되었습니다.");
        navi("/admin");
        console.log("문서 내용 :", contractText);
        setContractText("");
        updatePreview("");
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
      <PDFViewer style={{ width: "100%", height: "900px" }}>
        <PDF user={user} contractText={contractText} />
      </PDFViewer>
      <button onClick={saveDocument}>저장</button>
    </AC.ContractView>
  );
};

export default AdminContractView;
