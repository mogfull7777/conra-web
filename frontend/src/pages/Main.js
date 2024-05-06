import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./mainPageCss";

function Main() {
  const navi = useNavigate();

  return (
    <div>
      <S.Wrapper>
        <S.TitleSection>
          <S.Title>
            계약서가 필요하신가요?
            <br />
            <S.BoldText>컨.라</S.BoldText>를 이용해보세요!
          </S.Title>

          <S.StartBtn onClick={() => navi("/login")}>시작하기</S.StartBtn>
        </S.TitleSection>
      </S.Wrapper>
    </div>
  );
}

export default Main;
