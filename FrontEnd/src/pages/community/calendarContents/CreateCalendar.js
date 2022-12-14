import { useState } from "react";
import styled from "styled-components";
import { client } from "../../../utils/client";
import { FailAlert, SuccessAlert, EmptyAlert } from "../../../utils/sweetAlert";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "../../../components/room/UserProfile";
import { CommunityConFirmButton } from "../../../components/common/buttons/CommunityConfirmButton";

const DateText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left: 15%;
  text-align: left;
`;

const CreateCalendarBlock = styled.div`
  width: 85%;
  padding: 20px 0;
`;

const CreateHeader = styled.div``;

const CheckBoxWrapper = styled.div`
  display: flex;
  float: right;
  margin: 5px 10px 15px 10px;
  font-size: 11px;
  font-weight: bold;
`;

const InputForm = styled.textarea`
  background-color: white;
  width: 90%;
  height: 80px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 20px 0;
  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 5px #5983ff;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #80a8d1;
  }
`;

const InputDateBlock = styled.div`
  clear: both;
  width: 100%;
  height: 60px;
`;

const DateInputForm = styled.input`
  width: 40px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #bdcff2;
  border-radius: 8px;
  text-align: center;

  margin-left: 5px;
  margin-right: 3px;

  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 2px #5983ff;
  }
`;

const SelectBox = styled.select`
  margin: 0 10px;
  width: 120px;
  background-color: white;
  border: 2px solid #bdcff2;
  height: 33px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;

  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 14px;
    color: #b1b1b1;
  }

  &:focus {
    box-shadow: 0px 0px 2px #5983ff;
  }
`;

const InputAgesBlock = styled.div`
  height: 30px;
  width: 97.5%;
  border: 3px solid #bdcff2;
  border-radius: 3px;
  border-collapse: collapse;
`;

const AgesWrapper = styled.div`
  display: table-cell;
  color: ${(props) => props.color};
  height: 27px;
  padding-top: 3px;

  background-color: ${(props) => props.background};
  border-left: 1px solid ${(props) => props.borderColor};
  border-right: 1px solid ${(props) => props.borderColor};
  text-align: center;

  width: 4.4%;
  font-size: 14px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    transition: all 0.1s linear;
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackground};
  }
`;

const CheckBoxStyled = styled.input`
  display: none;
`;

const InputWrapper = styled.div`
  margin: 20px 0 30px 0;
`;

const PeopleLimitWrapper = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledAmountWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #bdcff2;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  line-height: 40px;
  background-color: white;
  color: #404040;
`;

const StyledMinusButton = styled.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #92a9d6;
  cursor: pointer;
  margin-right: 5px;
`;

const StyledPlusButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #92a9d6;
  cursor: pointer;
  margin-left: 5px;
`;

const AgeCheckBox = styled.input`
  margin-right: 3px;
`;

const CreateCalendar = ({ calendarDate, close, successHandler }) => {
  const user = useSelector((state) => state.user);
  const userAge = Math.floor(
    (new Date().getFullYear() - user.data.userBirthday.substring(0, 4) + 1) / 10
  );
  userAge >= 7 ? 7 : userAge;

  const [state, setState] = useState({
    content: "",
    ages: [
      userAge == 2 ? "Y" : "N",
      userAge == 3 ? "Y" : "N",
      userAge == 4 ? "Y" : "N",
      userAge == 5 ? "Y" : "N",
      userAge == 6 ? "Y" : "N",
      userAge == 7 ? "Y" : "N",
    ],
    date: {
      year: calendarDate.y,
      month: calendarDate.m,
      day: calendarDate.d,
    },
    hour: 0,
    minute: 0,
    place: "??????",
    peopleLimit: 2,
  });

  const [checkAllAges, setCheckAllAges] = useState(false);
  useEffect(() => {
    setState({
      ...state,
      ages: [
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
        checkAllAges ? "Y" : "N",
      ],
    });
  }, [checkAllAges]);

  const onCalendarInfoInput = (e) => {
    if (e.target.name == "hour" || e.target.name == "minute") {
      let onlyNumber = e.target.value.replace(/[^0-9]/g, "");
      onlyNumber = Math.max(
        0,
        Math.min(e.target.name == "hour" ? 23 : 59, onlyNumber)
      );
      setState({
        ...state,
        [e.target.name]: onlyNumber,
      });
      return;
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const initState = () => {
    setState({
      content: "",
      ages: [
        userAge == 2 ? "Y" : "N",
        userAge == 3 ? "Y" : "N",
        userAge == 4 ? "Y" : "N",
        userAge == 5 ? "Y" : "N",
        userAge == 6 ? "Y" : "N",
        userAge == 7 ? "Y" : "N",
      ],
      date: {
        year: calendarDate.y,
        month: calendarDate.m,
        day: calendarDate.d,
      },
      hour: 0,
      minute: 0,
      place: "??????",
      peopleLimit: 2,
    });
  };

  const onCalendarInfoSubmit = (e) => {
    e.preventDefault();
    // ??? ?????? ????????? ??????
    if (!state.content.length) {
      FailAlert(
        `??? ????????? ??? ?????????. '${state.place}?????? ?????? ??????~' ??? ??????????`
      );
      return;
    }

    for (let i = 0; i < state.ages.length; i++) {
      if (state.ages[i] == "Y") {
        break;
      }
      if (i == state.ages.length - 1) {
        alert("?????? ??? ??? ????????? ???????????? ??????????????????!");
        return;
      }
    }
    client
      .post("calendar", {
        calendarContent: state.content,
        calendarDatetime:
          String(state.date.year) +
          (state.date.month < 10
            ? "0" + String(state.date.month)
            : String(state.date.month)) +
          (state.date.day < 10
            ? "0" + String(state.date.day)
            : String(state.date.day)) +
          (state.hour < 10 ? "0" + String(state.hour) : String(state.hour)) +
          (state.minute < 10
            ? "0" + String(state.minute)
            : String(state.minute)),
        peopleLimit: state.peopleLimit,
        place: state.place,
        ages: state.ages,
      })
      .then(() => {
        initState();
        SuccessAlert("????????? ??????!");
        successHandler();
        close();
      })
      .catch((error) => {
        console.log("error: ", error);
        FailAlert(error.response.data.attributes.calendarDatetime);
        initState();
        successHandler();
        close();
      });
  };

  const onAgeCheckbox = (id) => {
    const tmpAge = state.ages;
    tmpAge[id] = state.ages[id] == "Y" ? "N" : "Y";
    setState({
      ...state,
      ages: tmpAge,
    });
  };

  // ?????? ????????? ???????????? ??????
  const onHandleIncrease = () => {
    const amount = state.peopleLimit + 1 > 8 ? 8 : state.peopleLimit + 1;
    setState({ ...state, peopleLimit: amount });
  };

  const onHandleDecrease = () => {
    const amount = state.peopleLimit - 1 < 2 ? 2 : state.peopleLimit - 1;
    setState({ ...state, peopleLimit: amount });
  };

  return (
    <>
      <CreateCalendarBlock>
        <ModalCloseButton
          close={() => {
            initState();
            close();
          }}
        />
        {/* ????????? + ???????????? ?????? */}
        <CreateHeader>
          <UserProfile user={user} />
        </CreateHeader>
        {/* ??? ?????? */}
        <InputForm
          type="text"
          value={state.content}
          name="content"
          placeholder="????????? ?????? ????????? ???????????????."
          onChange={onCalendarInfoInput}
          required
        />
        {/* ????????? ?????? */}
        <InputAgesBlock>
          {state.ages.map((item, index) => {
            return (
              <>
                <AgesWrapper
                  borderColor={index % 5 == 0 ? "none" : "#bdcff2"}
                  background={item == "Y" ? "#ebf1ff" : "#white"}
                  hoverBackground={item == "Y" ? "none" : "#ebf1ff"}
                  color="#3b3b3b"
                  onClick={() => {
                    onAgeCheckbox(index);
                  }}
                >
                  <label>
                    <CheckBoxStyled
                      type="checkbox"
                      id={index}
                      name="ages"
                      value={state.ages}
                      onChange={() => {
                        onAgeCheckbox(index);
                      }}
                    />
                  </label>
                  {index + 2}0???
                </AgesWrapper>
              </>
            );
          })}
        </InputAgesBlock>
        <CheckBoxWrapper>
          <AgeCheckBox
            type="checkbox"
            checked={checkAllAges}
            onChange={() => {
              setCheckAllAges(!checkAllAges);
            }}
          />
          {checkAllAges ? "????????????" : "????????????"}
        </CheckBoxWrapper>
        {/* ?????? ?????? */}
        <InputDateBlock>
          <DateText>
            {state.date.year}??? {state.date.month}??? {state.date.day}???
          </DateText>
          <DateInputForm
            value={state.hour}
            name="hour"
            placeholder="00"
            onChange={onCalendarInfoInput}
            pattern={"[0-9]+"}
            required
          />
          ???
          <DateInputForm
            value={state.minute}
            name="minute"
            placeholder="00"
            onChange={onCalendarInfoInput}
            required
          />
          ??????
          <SelectBox
            type="selectbox"
            value={state.place}
            name="place"
            onChange={onCalendarInfoInput}
            required
          >
            <option>??????</option>
            <option>???</option>
            <option>???</option>
            <option>????????????</option>
            <option>?????????</option>
            <option>?????????</option>
            <option>????????????</option>
            <option>??????</option>
            <option>?????????</option>
            <option>????????????</option>
            <option>?????????</option>
            <option>?????????</option>
            <option>?????????</option>
          </SelectBox>
          ?????? ?????????!
        </InputDateBlock>
        {/* ?????? ?????? */}
        <InputWrapper>
          {/* ????????? ?????? */}
          <PeopleLimitWrapper>
            <div>??????</div>
            <StyledMinusButton onClick={() => onHandleDecrease("peopleLimit")}>
              <i className="fas fa-minus"></i>
            </StyledMinusButton>
            <StyledAmountWrapper>{state.peopleLimit}</StyledAmountWrapper>
            <StyledPlusButton onClick={() => onHandleIncrease("peopleLimit")}>
              <i className="fas fa-plus"></i>
            </StyledPlusButton>
          </PeopleLimitWrapper>
        </InputWrapper>
        <CommunityConFirmButton
          marginRight="0"
          event={onCalendarInfoSubmit}
          content="??????"
        />
      </CreateCalendarBlock>
    </>
  );
};

export default CreateCalendar;
