import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    case "begin-booking-process": {
      console.log("begin booking");
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      return initialState;
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        status: "error",
        error: action.err,
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "purchase-ticket-success": {
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({ type: "begin-booking-process", ...data });
  };

  const cancelBookingProcess = () => {
    dispatch({ type: "cancel-booking-process" });
  };

  const purchaseTicketFailure = (data) => {
    dispatch({ type: "purchase-ticket-failure", ...data });
  };

  const purchaseTicketSuccess = () => {
    dispatch({ type: "purchase-ticket-success" });
  };

  const purchaseTicketRequest = (data) => {
    const seatId = data.purchaseSeatId;
    const price = data.price;
    dispatch({ type: "purchase-ticket-request" });
    fetch("api/book-seat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        seatId: data.purchaseSeatId,
        creditCard: data.creditCard,
        expiration: data.expiration,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        purchaseTicketSuccess();
      })
      .catch((err) => {
        purchaseTicketFailure({ err, seatId, price });
      });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
