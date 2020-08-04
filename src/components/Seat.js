import React from "react";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";

const Seat = ({
  rowIndex,
  seatIndex,
  width,
  height,
  price,
  status,
  rowName,
  seatNum,
}) => {
  return (
    <>
      <SeatButton disabled={status === "unavailable" ? true : false}>
        {status === "unavailable" ? (
          <GraySeat src={seatSrc} alt="booked seat" />
        ) : (
          <Tippy content={`Row ${rowName}, Seat ${seatNum} - $${price}`}>
            <img src={seatSrc} alt="empty seat" />
          </Tippy>
        )}
        {}
      </SeatButton>
    </>
  );
};

const GraySeat = styled.img`
  filter: grayscale(100%);
`;

const SeatButton = styled.button`
  border: none;
  outline: none;
`;

export default Seat;
