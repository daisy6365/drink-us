import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { nickNameDuplicateCheck } from "../../../api/AuthAPI";
import { editProfile } from "../../../api/MyPageAPI";
import ProfileTitle from "../../../components/auth/ProfileTitle";
import { getUserProfile } from "../../../store/actions/user";
import { FailAlert, SuccessAlert, loginAlert } from "../../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import ProfileButton from "../../../components/common/buttons/ProfileButton";
import { CalcUserCreated } from "../../../utils/CalcUserCreated";
import { GetPopularlityPercent } from "../../../utils/GetPopularlityPercent";
import Modal from "../../../components/modals/Modal";
import ProfileImageListContent from "../../../components/modals/contents/ProfileImageListContent";
const ProfileEditWrapper = styled.div`
  padding: 30px 30px 30px 10px;
  display: flex;
  flex-direction: column;
`;

const ProfileEditRowWapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${(props) => props.alignItems};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  margin-left: ${(props) => props.marginLeft};
`;

ProfileEditRowWapper.defaultProps = {
  padding: "8px 20px",
  border: "none",
  borderRadius: "0px",
  marginLeft: "0px",
  alignItems: "baseline",
};

const RatioWrapper = styled.div`
  width: ${(props) => props.width}%;
  text-align: ${(props) => props.textAlign};
  margin-left: ${(props) => props.marginLeft}px;
`;

RatioWrapper.defaultProps = {
  textAlign: "left",
  marginLeft: "0px",
};

const ProfileEditInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
  border-radius: ${(props) => props.borderRadius};
  font-size: 16px;
  margin-right: ${(props) => props.marginRight};
`;

const UserCreatedDayWrapper = styled.div`
  width: ${(props) => props.width};
  font-size: 16px;
  padding: 4px;
  margin-right: ${(props) => props.marginRight};
`;

const StyledButton = styled.button`
  adding: 4px;
  border: none;
  background-color: transparent;
  font-size: 16px;
  cursor: pointer;
`;

const StyledAmountWrapper = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #6f92bf;
  border-radius: 100%;
  margin: 0px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
ProfileEditInput.defaultProps = {
  padding: "4px",
  width: "72px",
  height: "20px",
  borderRadius: "5px",
  border: "1px solid #bcb9b9",
  marginRight: "0px",
};

const StyledPopularlity = styled.div`
  padding: 5px 20px;
  background-color: #eaf1ff;
  border-radius: 5px;
  box-sizing: border-box;
  width: ${(props) => props.width}%;
  box-sizing: border-box;
`;

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nickNameInput = useRef();
  const [profileState, setProfileState] = useState({
    userName: "",
    nickName: "",
    nickNameIsAvailAble: true,
    introduce: "",
    popularlity: 0,
    year: 0,
    month: 0,
    day: 0,
    soju: 0,
    beer: 0,
    userCreatedYear: 0,
    userCreatedMonth: 0,
    userCreatedDay: 0,
  });
  const [PopularlityPercentState, setPopularlityPercentState] = useState(1);
  const [profileImageState, setProfileImageState] = useState("1");
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    const [userCreatedYear, userCreatedMonth, userCreatedDay] = CalcUserCreated(
      user.data.userCreatedDate
    );
    const userProfile = {
      userName: user.data.userName,
      nickName: user.data.userNickname,
      userFullname: user.data.userFullname,
      introduce:
        user.data.userIntroduce !== null ? user.data.userIntroduce : "",
      popularlity: user.data.userPopularity,
      year:
        user.data.userBirthday !== null
          ? user.data.userBirthday.substr(0, 4)
          : "0000",
      month:
        user.data.userBirthday !== null
          ? user.data.userBirthday.substr(4, 2)
          : "00",
      day:
        user.data.userBirthday !== null
          ? user.data.userBirthday.substr(6, 2)
          : "00",
      soju: user.data.userSoju,
      beer: user.data.userBeer,
      userCreatedYear,
      userCreatedMonth,
      userCreatedDay,
    };
    const popularlityPercent = GetPopularlityPercent(user.data.userPopularity);
    setProfileState((prevState) => {
      return { ...prevState, ...userProfile };
    });
    setPopularlityPercentState(popularlityPercent);
    setProfileImageState(!user.data.userImg ? "1" : user.data.userImg);
  }, []);
  const onHandleProfileState = (e) => {
    setProfileState({ ...profileState, [e.target.name]: e.target.value });
  };

  const onHandleIncrease = (type) => {
    setProfileState({ ...profileState, [type]: profileState[type] + 1 });
  };

  const onHandleDecrease = (type) => {
    const amount = profileState[type] - 1 < 0 ? 0 : profileState[type] - 1;
    setProfileState({ ...profileState, [type]: amount });
  };

  const onHandleNickNameDuplicateCheck = async () => {
    const data = {
      userNickname: profileState.nickName,
    };
    const result = await nickNameDuplicateCheck(data);
    if (
      user.data.userNickname === profileState.nickName ||
      result.status === 200
    ) {
      SuccessAlert("사용가능한 닉네임 입니다.");
      setProfileState({ ...profileState, nickNameIsAvailAble: true });
      return;
    }
    if (result.status === 400) {
      FailAlert("이미 사용중인 닉네임 입니다.");
      nickNameInput.current.focus();
      setProfileState({ ...profileState, nickNameIsAvailAble: false });
      return;
    }
  };

  const onHandleEditProfile = async () => {
    if (!profileState.nickNameIsAvailAble) {
      FailAlert("닉네임을 확인해주세요");
      nickNameInput.current.focus();
      return;
    }
    const userBirthday =
      profileState.year + profileState.month + profileState.day;
    const data = {
      userNickname: profileState.nickName,
      userIntroduce: profileState.introduce,
      userSoju: profileState.soju,
      userBeer: profileState.beer,
      userImg: profileImageState,
      userBirthday,
    };
    const result = await editProfile(data);
    if (result.status === 200) {
      SuccessAlert("프로필 정보가 변경되었습니다.");
      dispatch(getUserProfile());
    }
  };

  const openModal = () => {
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  const onHandleChangeProfileImage = (profileImageId) => {
    setProfileImageState((prev) => profileImageId);
    closeModal();
  };
  return (
    <div style={{ padding: "30px 0px 30px 60px" }}>
      <Modal
        isOpen={modalState}
        modalContent={
          <ProfileImageListContent
            profileImageState={profileImageState}
            onClcik={onHandleChangeProfileImage}
            close={closeModal}
          />
        }
      />
      <ProfileTitle
        isEdit={true}
        openModal={openModal}
        imageId={profileImageState}
        userName={profileState.userName}
      />
      <ProfileEditWrapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            이름
          </RatioWrapper>
          <RatioWrapper width={15} textAlign={"left"} marginLeft={"20"}>
            {profileState.userFullname}
          </RatioWrapper>
        </ProfileEditRowWapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            닉네임
          </RatioWrapper>
          <ProfileEditRowWapper
            style={{
              justifyContent: "space-between",
              width: "70%",
              alignItems: "center",
            }}
          >
            <RatioWrapper>
              <ProfileEditInput
                ref={nickNameInput}
                width={"280px"}
                name="nickName"
                value={profileState.nickName}
                onChange={onHandleProfileState}
              />
            </RatioWrapper>
            <div>
              <ProfileButton
                bgColor={"#676775"}
                text={"중복검사"}
                color={"white"}
                padding={"8px 16px"}
                fontSize={"14px"}
                borderRadius={"5px"}
                onClick={onHandleNickNameDuplicateCheck}
              />
            </div>
          </ProfileEditRowWapper>
        </ProfileEditRowWapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            소개
          </RatioWrapper>
          <ProfileEditRowWapper style={{ width: "70%" }}>
            <ProfileEditInput
              width={"100%"}
              name="introduce"
              value={profileState.introduce}
              onChange={onHandleProfileState}
            />
          </ProfileEditRowWapper>
        </ProfileEditRowWapper>
        <ProfileEditRowWapper alignItems={"center"}>
          <RatioWrapper width={15} textAlign={"right"}>
            인기도
          </RatioWrapper>
          <ProfileEditRowWapper
            style={{ width: "40%" }}
            padding={"0px"}
            textAlign={"left"}
            marginLeft={"20px"}
            border={"1px solid #bcb9b9"}
            borderRadius={"5px"}
          >
            <div style={{ width: "100%" }}>
              <StyledPopularlity width={profileState.popularlity}>
                {profileState.popularlity}º
              </StyledPopularlity>
            </div>
          </ProfileEditRowWapper>
          <img
            style={{ width: "40px", height: "40px", marginLeft: "20px" }}
            src={
              process.env.PUBLIC_URL +
              `/assets/alcoholImage/${PopularlityPercentState}.png`
            }
          />
        </ProfileEditRowWapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            생년월일
          </RatioWrapper>
          <ProfileEditRowWapper
            style={{
              justifyContent: "space-between",
              width: "70%",
              alignItems: "center",
            }}
          >
            <div>
              <ProfileEditInput
                width={"80px"}
                marginRight={"10px"}
                name="year"
                value={profileState.year}
                onChange={onHandleProfileState}
              />
              년
            </div>
            <div>
              <ProfileEditInput
                width={"80px"}
                marginRight={"10px"}
                name="month"
                value={profileState.month}
                onChange={onHandleProfileState}
              />
              월
            </div>
            <div>
              <ProfileEditInput
                width={"80px"}
                marginRight={"10px"}
                name="day"
                value={profileState.day}
                onChange={onHandleProfileState}
              />
              일
            </div>
          </ProfileEditRowWapper>
        </ProfileEditRowWapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            가입일
          </RatioWrapper>
          <ProfileEditRowWapper
            style={{
              justifyContent: "space-between",
              width: "70%",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex" }}>
              <UserCreatedDayWrapper width={"80px"} marginRight={"10px"}>
                {profileState.userCreatedYear}
              </UserCreatedDayWrapper>
              <span style={{ padding: "4px 0px" }}>년</span>
            </div>
            <div style={{ display: "flex", padding: "4px" }}>
              <UserCreatedDayWrapper width={"80px"} marginRight={"10px"}>
                {profileState.userCreatedMonth}
              </UserCreatedDayWrapper>
              <span style={{ padding: "4px 0px" }}>월</span>
            </div>
            <div style={{ display: "flex" }}>
              <UserCreatedDayWrapper width={"80px"} marginRight={"10px"}>
                {profileState.userCreatedDay}
              </UserCreatedDayWrapper>
              <span style={{ padding: "4px 0px" }}>일</span>
            </div>
          </ProfileEditRowWapper>
        </ProfileEditRowWapper>
        <ProfileEditRowWapper>
          <RatioWrapper width={15} textAlign={"right"}>
            주량
          </RatioWrapper>
          <div style={{ width: "70%" }}>
            <ProfileEditRowWapper
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div>소주를</div>
              <ProfileEditRowWapper>
                <StyledButton onClick={() => onHandleDecrease("soju")}>
                  <i className="fas fa-minus"></i>
                </StyledButton>
                <StyledAmountWrapper>{profileState.soju}</StyledAmountWrapper>
                <StyledButton onClick={() => onHandleIncrease("soju")}>
                  <i className="fas fa-plus"></i>
                </StyledButton>
              </ProfileEditRowWapper>
              <div>잔 마셔요</div>
            </ProfileEditRowWapper>
            <ProfileEditRowWapper
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div>맥주를</div>
              <ProfileEditRowWapper>
                <StyledButton onClick={() => onHandleDecrease("beer")}>
                  <i className="fas fa-minus"></i>
                </StyledButton>
                <StyledAmountWrapper>{profileState.beer}</StyledAmountWrapper>
                <StyledButton onClick={() => onHandleIncrease("beer")}>
                  <i className="fas fa-plus"></i>
                </StyledButton>
              </ProfileEditRowWapper>
              <div>잔 마셔요</div>
            </ProfileEditRowWapper>
          </div>
        </ProfileEditRowWapper>
      </ProfileEditWrapper>
      <div style={{ paddingRight: "100px", textAlign: "right" }}>
        <ProfileButton
          onClick={onHandleEditProfile}
          text={"수정완료"}
          bgColor={"#6F92BF"}
          color="white"
          fontSize="18px"
          borderRadius={"5px"}
        />
      </div>
    </div>
  );
};

export default EditProfile;
