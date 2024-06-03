import React from "react";
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
    textAlign: "center",
    fontSize: "11px",
    fontWeight: "normal",
    fontStyle: 800,
  },
});

function AdminContractPdf({ user }) {
  console.log("user :", user);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
          <Text>Section #3</Text>
          <Text style={styles.preview}>this is preview</Text>
          <Text style={styles.preview}>한글은 어떻게 나올까요?</Text>
          <Text style={styles.preview}>이렇게 나오나요?? {user.name}</Text>
        </View>
      </Page>
    </Document>
  );
}

// PDF 뷰어 컴포넌트
const PDF = ({ user }) => (
  <PDFViewer style={{ width: "100%", height: "900px" }}>
    <AdminContractPdf user={user} />
  </PDFViewer>
);

export default PDF;
