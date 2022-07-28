import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import axios from "axios";

const Wrapper = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NeonLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 40px;
  height: 700px;
  background-color: #131317;
  width: 450px;
`;

const JoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const JoinForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const GuideLine = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: white;
`;

const InputWrapper = styled.div`
  justify-content: space-between;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  border: 1px solid black;
  background-color: #676775;
  margin: 14px;
  position: relative;
`;

const JoinInput = styled.input`
position: relative;
height: 30px;
width: 280px;
top: 7px;
font-size: 18px;
background-color: transparent;
outline: none;
border: none;
margin: 0px;
color: white;
`;

const DoubleCheckButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
  color: #535353;
`

const SendEmailButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
  color: #535353;
`

const ConfirmButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
  color: #535353;
`

const Button = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #fff;
  margin: 14px;
  font-size: 4px;
  color: #535353;
`;


const Join = () => {
  const [state, setState] = useState({
    // 회원가입 인풋
    userName: "",
    authToken: "",
    userPw: "",
    userPwCheck: "",
    userFullname: "",
    userBirthday: "",

    // 유효 문구
    nameMsg: "",
    confirmMsg: "",
    nameDoubleMsg: "",
    userPwMsg: "",
    userPwCheckMsg: "",

    // 유효 여부
    nameValid: "",
    confirmValid: "",  // 인증번호 유효
    userPwValid: "",
    userPwCheckValid: "",
  });
  const navigate = useNavigate();

  // 입력
  const onHandleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // 제출
  const onHandleSubmit = (e) => {
    e.preventDefault();
    // 이메일 유효성 체크
    const idRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const idCurrent = state.userName
        if (!idRegex.test(idCurrent)) {
          setState({...state, nameMsg: "유효하지 않은 이메일 형식입니다"});
          setState({ ...state, nameValid: false });
          alert("유효하지 않은 이메일 형식입니다")
        } else {
          setState({ ...state, nameMsg: "이메일OK" });
          setState({ ...state, nameValid: true });
          console.log('이메일 통과O')
        }
    
    // 비밀번호 유효성 체크
    const userPwRegex =
      // /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}$/
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/i
        const userPwCurrent = state.userPw
        if (!userPwRegex.test(userPwCurrent)) {
          setState({...state, userPwMsg: "비밀번호는 영문 대,소문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다."});
          setState({ ...state, userPwValid: false });
          alert("비밀번호는 영문 대,소문자와 숫자,특수기호가 적어도 1개 이상씩 포함된 8자~20자의 비밀번호여야 합니다.")
          console.log("비밀번호 통과X")
        } else {
          setState({ ...state, userPwMsg: "비밀번호OK" });
          setState({ ...state, userPwValid: true });
          console.log('비밀번호 통과O')
        }

    // 비밀번호 중복 체크
    const userPwCheck = state.userPwCheck
    if (userPwCheck !== state.userPw) {
      setState({...state, userPwCheckValid: false });
      alert("비밀번호가 일치하지 않습니다")
      console.log("비밀번호 일치X")
    } else {
      setState({...state, userPwCheckValid: true });
    }
  
    // 회원가입 axios 요청
    axios.post("http://localhost:8080/users/join", {
      userName: state.userName,
      userPw: state.userPw,
      userFullname: state.userFullname,
      userBirthday: state.userBirthday
    }).then(function (response) {
        console.log(response.data.message)
        navigate("/login")
    }).catch(function(error) {
      console.log(error);
    })
  };

  // // 이메일 인증번호 전송
  // const onSendEmail = (e) => {
  //   e.preventDeafult();
  //   axios.post("http://localhost:8080/email/sendCheckMail", {
  //     userName: state.userName,
  //   }).then(function (response) {
  //   }).catch(function(error) {
  //     console.log(error);
  //   })
  //   }

  // // 인증번호 확인
  // const onConfirmEmail = (e) => {
  //   e.preventDefault();
  //   axios.patch("http://localhost:8080/email/confirm", {
  //     authToken: state.authToken,
  //   }).then(function (response)  {
  //     this.setState({
  //       confirmValid: true,
  //       confirmMsg: response.message
  //     })
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  //   }
  
  // 중복확인 버튼 --> requestBody로 수정되면 확인할 것!!!!!!!!
  // const onDoubleCheck = (e) => {
  //   e.preventDefault();
  //   // axios 요청
  //   axios.post("http://localhost:8080/users/join/id", {
  //     userName: state.userName,
  //   }).then(function (response) {
  //     // console.log(response)
  //   }).catch(function(error) {
  //     console.log(error);
  //   })
  // };


  return (
    <div>
      <Header />
      <Wrapper>
        <NeonLoginWrapper>
          <JoinWrapper>
            {/* 제출 폼 */}
            <JoinForm>
              <GuideLine>이메일</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="email"
                  value={state.userName}
                  name="userName"
                  onChange={onHandleInput}
                />
                {/* <DoubleCheckButton onClick={onDoubleCheck}> */}
                <DoubleCheckButton>
                  중복확인
                </DoubleCheckButton>
                {/* <SendEmailButton onClick={onSendEmail}>
                  이메일 인증 보내기
                </SendEmailButton>
              </InputWrapper>
              <GuideLine>인증번호 입력</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="string"
                  value={state.authToken}
                  name="authToken"
                  onChange={onHandleInput}
                />
                <ConfirmButton onClick={onConfirmEmail}>
                  인증번호 확인
                </ConfirmButton> */}
              </InputWrapper>
              <GuideLine>비밀번호</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="password"
                  value={state.userPw}
                  name="userPw"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>비밀번호 확인</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="password"
                  value={state.userPwCheck}
                  name="userPwCheck"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>이름</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="userFullname"
                  value={state.userFullname}
                  name="userFullname"
                  onChange={onHandleInput}
                />
              </InputWrapper>
              <GuideLine>생년월일</GuideLine>
              <InputWrapper>
                <JoinInput
                  type="userBirthday"
                  value={state.userBirthday}
                  name="userBirthday"
                  onChange={onHandleInput}
                  placeholder="ex)19991212"
                />
              </InputWrapper>
            </JoinForm>
            {/* 모든 유효성 검사 후 버튼 활성화 */}
            <Button
              onClick={onHandleSubmit}
              // disabled={!( state.userPwValid && state.userPwCheckValid )}
            >JOIN</Button>
            <Link to="/"> 
              <Button>MAIN</Button>
            </Link>
          </JoinWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  );
};

export default Join;