import styled from "styled-components";
import { useState } from "react";
import RoomModal from "./RoomModal";
import { TimeGap } from "../../utils/TimeGap";

const RoomBox = styled.div`
  display: flex;
  background-color: white;
  width: 400px;
  height: 300px;
  border-radius: 30px;
`

const LiveListItem = ({
  roomId,
  roomName,
  peopleLimit,
  placeTheme,
  createdDate
}) => {

  // 모달
  const [isOpen, setIsOpen] = useState(false)

  const modalOpen = () =>{
    setIsOpen(true);
  }

  const modalClose = () =>{
    setIsOpen(false);
  }

  const timeGap = TimeGap(createdDate)

  return (
    <>
    <RoomModal close={modalClose}
      isOpen={isOpen}
      roomId={roomId}
    />
    <RoomBox onClick={modalOpen}>
      <div>{roomId}</div>
      <div>{roomName}</div>
      <div>{peopleLimit}</div>
      <div>{placeTheme}</div>
      <div>{timeGap}시간 전</div>
    </RoomBox>
    </>
  )
}

export default LiveListItem