import styled from "styled-components";
import { client } from "../../../utils/client";
import { useEffect, useState } from "react";
import CalendarListItem from "../../../components/calendar/CalendarListItem";
import Modal from "../../../components/modals/Modal";
import CreateCalendar from "./CreateCalendar";
import { CommunityConFirmButton } from "../../../components/common/buttons/CommunityConfirmButton";
import ModalCloseButton from "../../../components/common/buttons/ModalCloseButton";
import PageNation from "../../../components/common/buttons/PageNation";

const Wrapper = styled.div`
  width: 1200px;
  margin:auto;
`;

const TextDiv = styled.div`
  margin: 21px 0;
`;

const NextDayButton = styled.button`
  display: inline;
  width: 20px;
  height: 30px;
  background-color: white;
  color: #495f7c;
  text-transform: uppercase;
  font-size: 25px;
  font-weight: 800;
  border: none;
  margin: 0px 8px 5px 8px;
`;

const DescriptionWrapper = styled.div`
  margin-left: 670px;
`;
const TitleWrapper = styled.div`
  text-align: center;

  margin-bottom: ${(props) => props.marginBottom};
`;

const ButtonWrapper = styled.span`
  display: flex;
  float: right;
`;

const Title = styled.h2`
  display: inline;
  color: #6f92bf;
  margin: 0px 8px 0px 8px;
`;

const ContentWrapper = styled.div`
  border-bottom: 5px solid rgb(228, 228, 228);
  min-height: 720px;
`;

const CalendarWrapper = styled.div``;
const ContentTitle = styled.div`
  height: 30px;
  margin-top: 15px;
  padding: 15px 0;
  border-top: 5px solid rgb(228, 228, 228);
  border-bottom: 3px solid rgb(228, 228, 228);
`;
const ContentListWrapper = styled.div``;
const Content = styled.div`
  width: ${(props) => props.width};
  font-weight: bold;
  font-size: 17px;
  margin-left: ${(props) => props.marginLeft || "30px"};
  text-align: ${(props) => props.textAlign || "center"};
  padding-left: ${(props) => props.paddingLeft};
  float: left;
`;

const CalendarButton = styled.button`
  padding: 10px 13px;
  width: 100px;
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  cursor: ${(props) => props.cursor};
  border-radius: 4px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
  border: 2px solid ${(props) => props.borderColor};

  &:hover {
    background-color: ${(props) => props.hoverBackground};
    color: ${(props) => props.hoverColor};
    transition: all 0.2s linear;
    border: 2px solid ${(props) => props.hoverBorderColor};
  }
`;

const Description = styled.span`
  position: absolute;
  background-color: rgba(255, 67, 67, 0.3);
  color: #404040;
  width: fit-content;
  border-radius: 3px;
  padding: 10px 8px;
  margin-top: -10px;

  font-size: 10px;

  &:hover ${CalendarButton} {
    display: none;
  }
`;

// ??????????????????
const PageNationWrapper = styled.div`
  margin-top: 20px;
  margin: 20px auto;
  width: 80%;
  padding-bottom: 20px;
`;

const DailyCalendar = ({ year, month, day, monthly, setNewDate }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [dailyCalendar, setDailyCalendar] = useState({
    content: [],
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalPages: 0,
  });
  const [curDate, setCurDate] = useState(new Date(year, month - 1, day));
  const dailyCalendarTitle = `
    ${curDate.getFullYear()}.
    ${curDate.getMonth() + 1}.
    ${curDate.getDate()}
  `;

  const onHandlePageButton = (pageNum) => {
    fetchData(pageNum);
  };

  const fetchData = async (pageNum) => {
    const response = await client
      .get(
        `/calendar/daily?year=${curDate.getFullYear()}
      &month=${curDate.getMonth() + 1}
      &day=${curDate.getDate()}&page=${pageNum}`
      )
      .then((response) => response)
      .catch(function (error) {
        console.log(error);
      });
    setDailyCalendar({ ...response.data });
  };

  const [modalState, setModalState] = useState({ write: false, list: false });
  const openWriteModal = () => {
    setModalState({ write: true, list: modalState.list });
  };

  const closeWriteModal = () => {
    setModalState({ write: false, list: modalState.list });
  };

  useEffect(() => {
    fetchData(dailyCalendar.number);

    setNewDate(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      curDate.getDate()
    );
  }, [curDate]);

  const nextDay = parseInt(day) + 1;

  return (
    <>
    <Wrapper>
      <CalendarWrapper>
        <Modal
          isOpen={modalState.write}
          modalContent={
            <CreateCalendar
              calendarDate={{ y: year, m: month, d: day }}
              close={closeWriteModal}
              successHandler={fetchData}
            />
          }
          width="600px"
          zIndex={1}
          background="#fcfcfc"
          borderColor="none"
        />

        <TitleWrapper>
          <NextDayButton
            onClick={() => {
              setCurDate(
                new Date(
                  curDate.getFullYear(),
                  curDate.getMonth(),
                  curDate.getDate() - 1
                )
              );
            }}
          >
            &#60;
          </NextDayButton>
          <Title>{dailyCalendarTitle}</Title>
          <NextDayButton
            onClick={() => {
              setCurDate(
                new Date(
                  curDate.getFullYear(),
                  curDate.getMonth(),
                  curDate.getDate() + 1
                )
              );
            }}
          >
            &#62;
          </NextDayButton>
        </TitleWrapper>

        <TitleWrapper marginBottom="60px">
          <ButtonWrapper>
            {new Date(
              curDate.getFullYear(),
              curDate.getMonth(),
              curDate.getDate() + 1
            ) <= new Date() ? (
              <>
                <CalendarButton
                  background="#c4c4c4"
                  color="#fff"
                  borderColor="#c4c4c4"
                  hoverBorderColor="#c4c4c4"
                  onMouseLeave={() => {
                    setShowDescription(false);
                  }}
                  onMouseOver={() => {
                    setShowDescription(true);
                  }}
                >
                  ?????? ??????
                </CalendarButton>
              </>
            ) : (
              <>
                <CommunityConFirmButton
                  event={openWriteModal}
                  content="?????? ??????"
                />
              </>
            )}
            <CommunityConFirmButton
              event={() => {
                monthly();
              }}
              background="#fff"
              color="#bdcff2"
              borderColor="#bdcff2"
              hoverBackground="#c4c4c4"
              hoverColor="#fff"
              hoverBorderColor="#c4c4c4"
              content="????????????"
            />
          </ButtonWrapper>
        </TitleWrapper>
        <DescriptionWrapper>
          {showDescription ? (
            <>
              <Description>
                ?????? ???????????? ????????? ????????? ??? ????????????!
              </Description>
            </>
          ) : (
            <></>
          )}
        </DescriptionWrapper>
      </CalendarWrapper>

      <ContentWrapper>
        <ContentTitle>
          <Content width="230px" marginLeft="0">
            ?????????
          </Content>
          <Content width="500px" paddingLeft="50px" textAlign="left">
            ??????
          </Content>
          <Content width="90px">??????</Content>
          <Content width="90px">??????</Content>
          <Content width="90px">??????</Content>
        </ContentTitle>
        <ContentListWrapper>
          {dailyCalendar.length == 0 ? (
            <TextDiv>?????? ?????? ????????? ?????????. ????????? ???????????????!</TextDiv>
          ) : (
            <>
              {dailyCalendar.content.map((content, index) => (
                <CalendarListItem
                  year={year}
                  month={month}
                  day={day}
                  content={content}
                  key={index}
                  successHandler={fetchData}
                />
              ))}
            </>
          )}
        </ContentListWrapper>
      </ContentWrapper>
      <PageNationWrapper>
        <PageNation
          onClick={onHandlePageButton}
          number={dailyCalendar.number + 1}
          size={dailyCalendar.size}
          totalPages={dailyCalendar.totalPages}
          bgColor={"#a2b8ff"}
          activeNumberColor={"#FFFFFF"}
          numberColor={"#bdcff2"}
          directionColor={"#bdcff2"}
        />
      </PageNationWrapper>
      </Wrapper>
    </>
  );
};

export default DailyCalendar;
