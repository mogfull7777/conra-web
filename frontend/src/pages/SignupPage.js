import axios from "axios";
import React, { useId, useRef } from "react";
import * as S from "./mainPageCss";
import { useNavigate } from "react-router-dom";
const SIGNUP_SERVER_URL = "http://localhost:5000/api/users/register";

function SignupPage() {
  const id = useId();
  const navi = useNavigate();

  const loginHandle = () => {
    navi("/login");
  };

  // 필요한 정보들

  const identityRefName = useRef(null);
  const identityRefEmail = useRef(null);
  const IdentityRefPhone = useRef(null);
  const identityRefPassword = useRef(null);
  const identityRefPasswordChack = useRef(null);
  const identityRefChackBox = useRef(false);

  // 회원정보 db에 보내기

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const name = identityRefName.current.value;
    const email = identityRefEmail.current.value;
    const phone = IdentityRefPhone.current.value;
    const password = identityRefPassword.current.value;
    const passwordChack = identityRefPassword.current.value;
    const privacyChack = identityRefChackBox.current.checked;

    if (password !== passwordChack) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    } else if (identityRefChackBox.current.checked !== true) {
      alert("이용약관 및 개인정보 보호정책에 동의해주세요.");
      return;
    } else if (name === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(SIGNUP_SERVER_URL, {
        name,
        email,
        phone,
        password,
        privacyChack,
      });
      alert("회원가입이 완료되었습니다!");
      loginHandle();
      console.log("response :", response);
    } catch (err) {
      console.log("error :", err);
    }
  };

  return (
    <S.Wrapper>
      <S.SignupSection>
        <S.InputSettion onSubmit={signupSubmitHandler}>
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
            ref={identityRefPasswordChack}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요."
          />
          <S.LoginMaintainChack
            id={`${id}-checkBox`}
            ref={identityRefChackBox}
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
