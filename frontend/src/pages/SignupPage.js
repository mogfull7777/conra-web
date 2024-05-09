import axios from "axios";
import React, { useId, useRef, useState } from "react";
import * as S from "./mainPageCss";
import { useNavigate } from "react-router-dom";

const SIGNUP_OPTION = ["사업자 회원가입", "고객 회원가입"];
const SIGNUP_SERVER_URL = "http://localhost:5000/api/users/register";

function SignupPage() {
  const id = useId();
  const navi = useNavigate();

  const loginHandle = () => {
    navi("/login");
  };

  // 필요한 정보들

  const [signupIdentity, setSignupIdentity] = useState("사업자 회원가입");

  const identityRefName = useRef(null);
  const identityRefEmail = useRef(null);
  const IdentityRefPhone = useRef(null);
  const identityRefPassword = useRef(null);
  const identityRefPasswordCheck = useRef(null);
  const identityRefCheckBox = useRef(false);

  // 회원정보 db에 보내기

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const name = identityRefName.current.value;
    const email = identityRefEmail.current.value;
    const phone = IdentityRefPhone.current.value;
    const password = identityRefPassword.current.value;
    const passwordCheck = identityRefPasswordCheck.current.value;
    const privacyCheck = identityRefCheckBox.current.checked;

    // 회원가입 유형에 따른 role 설정
    const role = signupIdentity === "사업자 회원가입" ? 0 : 1;

    // 비밀번호와 이용약관 브레이크
    if (password !== passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    } else if (privacyCheck !== true) {
      alert("이용약관 및 개인정보 보호정책에 동의해주세요.");
      return;
    }
    try {
      const response = await axios.post(SIGNUP_SERVER_URL, {
        name,
        email,
        phone,
        password,
        role,
        privacyCheck,
      });

      console.log("password :", password);
      console.log("passwordChack :", passwordCheck);

      alert("회원가입이 완료되었습니다!");
      loginHandle();
      console.log("response :", response);
    } catch (err) {
      console.log("error :", err);
    }
  };

  // 회원가입 방식 설정

  const handleOptionClick = (option) => {
    setSignupIdentity(option);
    console.log("Selected option:", option);
  };

  return (
    <S.Wrapper>
      <S.SignupSection>
        <S.InputSettion onSubmit={signupSubmitHandler}>
          <S.SignupIdentity>
            {SIGNUP_OPTION.map((option, index) => (
              <S.SignupIdentityList
                key={`${id}-userDivison-${index}`}
                id={`${id}-userDivison-${index}`}
                style={{
                  color: signupIdentity === option ? "#353535" : "#d9d9d9",
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </S.SignupIdentityList>
            ))}
          </S.SignupIdentity>
          <S.InputArea
            id={`${id}-userName`}
            ref={identityRefName}
            type="text"
            required
            placeholder="이름을 입력해주세요."
          />
          <S.InputArea
            id={`${id}-email`}
            ref={identityRefEmail}
            type="email"
            required
            placeholder="이메일을 입력해주세요."
          />
          <S.InputArea
            id={`${id}-phonenumber`}
            ref={IdentityRefPhone}
            type="number"
            required
            placeholder="휴대전화번호을 입력해주세요."
          />
          <S.InputArea
            id={`${id}-password`}
            ref={identityRefPassword}
            type="password"
            required
            placeholder="비밀번호를 입력해주세요."
          />
          <S.InputArea
            id={`${id}-passwordCheck`}
            ref={identityRefPasswordCheck}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
          <S.LoginMaintainChack
            id={`${id}-checkBox`}
            ref={identityRefCheckBox}
            type="checkbox"
          />
          <label>이용약관 및 개인정보 보호정책에 동의하십니까?</label>
          <S.SignupLine />
          <S.LoginBtn type="submit">회원가입</S.LoginBtn>
        </S.InputSettion>
        <S.SignupToGoLogin>
          이미 계정이 있으신가요?
          <S.SignupLoginBtn onClick={loginHandle}>로그인</S.SignupLoginBtn>
        </S.SignupToGoLogin>
      </S.SignupSection>
    </S.Wrapper>
  );
}

export default SignupPage;

// CSS관련

// 1. 이용약관 클릭 포커스 필요
