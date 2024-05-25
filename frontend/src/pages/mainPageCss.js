import styled from "styled-components";

// main.js css

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleSection = styled.section`
  width: 60%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-size: 5rem;
`;

export const BoldText = styled.span`
  font-weight: bolder;
`;

export const StartBtn = styled.button`
  width: 18rem;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 4.375rem;
  border: none;
  box-shadow: 0px 0px 0px 0.025rem #ffffff;
  background-color: #353535;
  padding: 1.25rem;
  font-size: 1.25rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  margin-left: auto;
  &:hover {
    color: #353535;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

// loginpage css

export const LoginSection = styled.section`
  width: 31.25rem;
  height: 34.375rem;
`;

export const LoginIdentity = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.7rem;

  & :last-child {
    border-right: none;
  }
`;

export const LoginIdentityList = styled.li`
  width: calc(100% / 2);
  color: #d9d9d9;
  box-sizing: border-box;
  border-right: 0.063rem solid #d9d9d9;
  cursor: pointer;
  text-align: center;
`;

export const InputSettion = styled.form`
  width: 100%;
`;

export const InputArea = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 4.375rem;
  border: none;
  background-color: #d9d9d9;
  padding: 1.25rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;

  outline: none;
  &::placeholder {
    color: #ffffff;
  }
`;

export const LoginBtn = styled.button`
  width: 100%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 4.375rem;
  border: none;
  box-shadow: 0px 0px 0px 0.025rem #ffffff;
  background-color: #353535;
  padding: 1.25rem;
  font-size: 1.25rem;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  &:hover {
    color: #353535;
    background: #ffffff;
    box-shadow: 0px 0px 0px 0.025rem #353535;
  }
`;

export const LoginHelpSection = styled.section`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  opacity: 1;
`;

export const LoginMaintain = styled.form`
  padding: 0.3rem;
`;

export const LoginMaintainChack = styled.input`
  border: 0.025rem soild #353535;
  margin-right: 0.4rem;
  accent-color: #353535;
`;

export const LoginForget = styled.label`
  cursor: pointer;
  transition: all 0.4s;
  padding: 0.3rem;
  &:hover {
    background: #353535;
    color: #ffffff;
  }
`;

export const SignupBtn = styled.button`
  width: 100%;
  box-sizing: border-box;
  border-radius: 3.125rem;
  height: 4.375rem;
  border: none;
  box-shadow: 0px 0px 0px 0.055rem #353535;
  background-color: #ffffff;
  padding: 1.25rem;
  font-size: 1.25rem;
  color: #353535;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: bold;
  &:hover {
    color: #ffffff;
    background: #353535;
    box-shadow: 0px 0px 0px 0.055rem #ffffff;
  }
`;

// signup css

export const SignupSection = styled.section`
  width: 31.25rem;
  height: 34.375rem;
`;

export const SignupToGoLogin = styled.p`
  margin-top: 1rem;
`;
export const SignupLoginBtn = styled.span`
  cursor: pointer;
  margin-left: 0.35rem;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

export const SignupLine = styled.hr`
  margin: 1.5rem 0;
`;

export const SignupIdentity = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.7rem;

  & :last-child {
    border-right: none;
  }
`;

export const SignupIdentityList = styled.li`
  width: calc(100% / 2);
  color: #d9d9d9;
  box-sizing: border-box;
  border-right: 0.063rem solid #d9d9d9;
  cursor: pointer;
  text-align: center;
`;
