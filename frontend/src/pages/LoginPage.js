import React, { useEffect, useId, useRef, useState } from "react";
import * as S from "./mainPageCss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../UserContext";

const LOGIN_OPTION = ["사업자 로그인", "고객 로그인", "비회원 로그인"];
const LOGIN_SERVER_URL = "http://localhost:5000/api/users/login";

function LoginPage() {
  // 상수

  const { setUser } = useUser();
  const id = useId();
  const navi = useNavigate();
  const [loginIdentity, setLoginIdentity] = useState(`고객 로그인`);
  const contractAdminHandle = () => {
    navi("/admin");
  };

  // navi

  const signupHandle = () => {
    navi("/signup");
  };

  // 로그인 사용자 설정

  const identityRefEmail = useRef(null);
  const identityRefPassword = useRef(null);
  const notIdentityRefNumber = useRef(null);
  const notIdentityRefPhone = useRef(null);
  const loginHelpSectionRef = useRef(null);

  // 로그인 정보 보내기

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // 사용자 입력으로부터 이메일과 비밀번호 가져오기.
      const email = identityRefEmail.current.value;
      const password = identityRefPassword.current.value;

      // 로그인 요청 보내기
      const response = await axios.post(
        LOGIN_SERVER_URL,
        { email, password },
        {
          withCredentials: true,
        }
      );

      console.log("userEmail :", email, "userPassword :", password);
      console.log("Login Response: ", response.data);

      // 성공적으로 응답을 받았을 때, 유저 데이터 설정
      if (response.data) {
        setUser(response.data);
        alert("로그인 성공!!!");
        contractAdminHandle();
      }
    } catch (err) {
      console.log("error : ", err);
      alert("로그인 실패");
    }
  };

  // 로그인 방식 설정

  useEffect(() => {
    const isMemberLogin = loginIdentity !== "비회원 로그인";
    const displayStyle = isMemberLogin ? "block" : "none";

    identityRefEmail.current.style.display = displayStyle;
    identityRefPassword.current.style.display = displayStyle;
    notIdentityRefNumber.current.style.display = isMemberLogin
      ? "none"
      : "block";
    notIdentityRefPhone.current.style.display = isMemberLogin
      ? "none"
      : "block";
    loginHelpSectionRef.current.style.opacity = isMemberLogin ? 1 : 0;
    loginHelpSectionRef.current.style.visibility = isMemberLogin
      ? "visible"
      : "hidden";
  }, [loginIdentity]);

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
            <S.InputArea
              id={`${id}-number`}
              type="password"
              ref={notIdentityRefNumber}
              placeholder="전달받은 번호를 입력해주세요."
              style={{ display: "none" }}
            />
            <S.InputArea
              id={`${id}-phone`}
              type="number"
              ref={notIdentityRefPhone}
              placeholder="전화번호를 입력해주세요."
              style={{ display: "none" }}
            />
            <S.LoginBtn type="submit">로그인</S.LoginBtn>
          </S.InputSettion>
          <S.LoginHelpSection ref={loginHelpSectionRef}>
            <S.LoginMaintain>
              <S.LoginMaintainChack id={`${id}-checkbox`} type="checkbox" />
              <label htmlFor={`${id}-checkbox`}>로그인 상태 유지</label>
            </S.LoginMaintain>
            <S.LoginForget>아이디 ・ 비밀번호를 잊어버리셨나요?</S.LoginForget>
          </S.LoginHelpSection>
          <S.SignupBtn onClick={signupHandle}>회원가입</S.SignupBtn>
        </S.LoginSection>
      </S.Wrapper>
    </div>
  );
}

export default LoginPage;
