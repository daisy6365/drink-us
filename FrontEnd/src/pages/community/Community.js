import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import { Wrapper } from "../../components/styled/Wrapper";
import { client } from "../../utils/client";

import CalendarCommunity from "./contents/CalendarCommunity";
import DailyCommunity from "./contents/DailyCommunity";

const Community = () => {

  const navigate = useNavigate();
  const [communityMode, setCommunityMode] = useState("calendar");

  // 스타일 지정

  const InnerWrapper = styled.div`
  width: 1200px;
  margin: 55px 10px 10px 0;
  `;

 const CalendarButtonWrapper = styled.div`
 margin-left: 20px;
 `;

  const CalendarButton = styled.button`
  padding: 12px 24px;
  background-color: ${({ color }) => color};
  color: ${({ textColor }) => textColor};
  font-size: 18px;
  margin: auto 0;
  border: 1px solid #bdcff2;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
    text-align: center;
`;

  // 스타일 끝

  return (
    <>
      <Header location={'lightzone'} />
      <Wrapper color="#fff" alignItems="baseline">
        <InnerWrapper>
            <CalendarButtonWrapper>
                <CalendarButton onClick={() => setCommunityMode("calendar")} color={communityMode == "calendar" ? "#bdcff2" : "#ffffff"} textColor={communityMode == "calendar" ? "#fff" : "#6F92BF"}>월간</CalendarButton>
                <CalendarButton onClick={() => setCommunityMode("daily")} color={communityMode == "calendar" ? "#fff" : "#bdcff2"} textColor={communityMode == "calendar" ? "#6F92BF" : "#fff"}>일간</CalendarButton>
            </CalendarButtonWrapper>
            <ContentWrapper>
            {communityMode == "calendar" ? <CalendarCommunity/> : <DailyCommunity/>}
            </ContentWrapper>
        </InnerWrapper>
      </Wrapper>
    </>
  );
}

export default Community;
