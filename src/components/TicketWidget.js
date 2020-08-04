import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, bookedSeats, seats },
  } = React.useContext(SeatContext);

  console.log("numOfRows: ", numOfRows, "seatsPerRow: ", seatsPerRow);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <>
      {hasLoaded === false ? (
        <ProgressDiv>
          <CircularProgress />
        </ProgressDiv>
      ) : (
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  return (
                    <SeatWrapper key={seatId}>
                      {bookedSeats[seatId] ? (
                        <GraySeat src={seatSrc} alt="booked seat" />
                      ) : (
                        <Tippy
                          content={`Row ${rowName}, Seat ${getSeatNum(
                            seatIndex
                          )} - $${seats[seatId].price}`}
                        >
                          <img src={seatSrc} alt="empty seat" />
                        </Tippy>
                      )}
                      {/* TODO: Render the actual <Seat /> */}
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};
const GraySeat = styled.img`
  filter: grayscale(100%);
`;

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const ProgressDiv = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TicketWidget;
