import { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  font-size: 30px;
`;

const AgreeWrapper = styled.div`
  /* display: flex; */
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const AgreeContent = styled.div`
  justify-content: space-between;
  width: 320px;
  height: 64px;
  border-radius: 36px;
  background-color: #131317;
  margin: 14px;
  position: relative;
`;

const ButtonWrapper = styled.div`
margin-top: 30px;
display: flex;
justify-content: space-between;
width: 120px;
`;

const Button = styled.button`
  font-size: 1rem;
  font-weight: 200;
  font-style: italic;
  color: #fff;
  padding: 1rem 1.2rem 1.1rem;
  border: 0.4rem solid #131317;
  border-radius: 2rem;
  text-transform: uppercase;
  background-color: #131317;
  cursor: pointer;
`;

const JoinAgree = ({ history }) => {
  const [checkedButtons, setCheckedButtons] = useState([]);
  const isAllChecked = checkedButtons.length === 3;
  const disabled = !isAllChecked;


  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedButtons([...checkedButtons, id]);
    } else {
      setCheckedButtons(checkedButtons.filter(button => button !== id));
    }
  };


  return (
    <div>
      <Header/>
      <Wrapper>
        <NeonLoginWrapper>
          <AgreeWrapper> 이용정보 동의 받을 곳 </AgreeWrapper>
            <AgreeContent>
              동의하세요
              <input
                type="checkbox"
                id="check"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check');
                }}
                checked={checkedButtons.includes('check') ? true : false}
                ></input>
                <label id="check" htmlFor="check"></label>
            </AgreeContent>
            <AgreeContent>
              동의하세요
              <input
                type="checkbox"
                id="check2"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check2');
                }}
                checked={checkedButtons.includes('check2') ? true : false}
                ></input>
                <label id="check2" htmlFor="check2"></label>
            </AgreeContent>
            <AgreeContent>
              동의하세요
              <input
                type="checkbox"
                id="check3"
                onChange={e => {
                  changeHandler(e.currentTarget.checked, 'check3');
                }}
                checked={checkedButtons.includes('check3') ? true : false}
                ></input>
                <label id="check3" htmlFor="check3"></label>
            </AgreeContent>
            <ButtonWrapper>
                <Link to="/">
                  <Button>MAIN</Button>
                </Link>
                <Link to="/join/type">
                  <Button
                    disabled={disabled}
                    onClick={() => history.push('/join/type')}
                    style={
                      disabled
                        ? { backgroundColor: '#131317' }
                        : { backgroundColor: '#605D9F' }
                    }
                  >NEXT</Button>
                </Link>
            </ButtonWrapper>
        </NeonLoginWrapper>
      </Wrapper>
    </div>
  )
};

export default JoinAgree;