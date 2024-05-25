import React, { useId, useRef, useState } from "react";
import * as S from "./mainPageCss";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const LOGIN_OPTION = ["사업자 로그인", "고객 로그인"];

function LoginPage() {
  // 상수

  const { loginUser } = useUser();
  const id = useId();
  const [loginIdentity, setLoginIdentity] = useState(`사업자 로그인`);

  const navi = useNavigate();

  // 로그인 사용자 설정

  const identityRefEmail = useRef(null);
  const identityRefPassword = useRef(null);

  const loginHelpSectionRef = useRef(null);

  // 로그인 정보 보내기

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    const email = identityRefEmail.current.value;
    const password = identityRefPassword.current.value;
    await loginUser(email, password, loginIdentity);
  };

  return (
    <div>
      <S.Wrapper>
        <S.LoginSection>
          <S.LoginIdentity>
            {LOGIN_OPTION.map((identityName, index) => (
              <S.LoginIdentityList
                key={`${id}-identity-${index}`}
                id={identityName}
                style={{
                  color: loginIdentity === identityName ? "#353535" : "#d9d9d9",
                }}
                onClick={() => {
                  setLoginIdentity(identityName);
                }}
              >
                {identityName}
              </S.LoginIdentityList>
            ))}
          </S.LoginIdentity>
          <S.InputSettion onSubmit={loginSubmitHandler}>
            <>
              <S.InputArea
                id={`${id}-email`}
                type="text"
                ref={identityRefEmail}
                placeholder="이메일을 입력해주세요."
              />
              <S.InputArea
                id={`${id}-password`}
                type="password"
                ref={identityRefPassword}
                placeholder="비밀번호를 입력해주세요."
              />
            </>

            <S.LoginBtn type="submit">로그인</S.LoginBtn>
          </S.InputSettion>
          <S.LoginHelpSection ref={loginHelpSectionRef}>
            <S.LoginMaintain>
              <S.LoginMaintainChack id={`${id}-checkbox`} type="checkbox" />
              <label htmlFor={`${id}-checkbox`}>로그인 상태 유지</label>
            </S.LoginMaintain>
            <S.LoginForget>아이디 ・ 비밀번호를 잊어버리셨나요?</S.LoginForget>
          </S.LoginHelpSection>

          <S.SignupBtn onClick={() => navi("/signup")}>회원가입</S.SignupBtn>
        </S.LoginSection>
      </S.Wrapper>
    </div>
  );
}

export default LoginPage;
