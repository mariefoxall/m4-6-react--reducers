import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, bookedSeats, seats },
  } = React.useContext(SeatContext);

  console.log("numOfRows: ", numOfRows, "seatsPerRow: ", seatsPerRow);

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
                      <Seat
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        width={36}
                        height={36}
                        price={seats[seatId].price}
                        status={
                          bookedSeats[seatId] ? "unavailable" : "available"
                        }
                        rowName={rowName}
                        seatNum={getSeatNum(seatIndex)}
                      />
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
