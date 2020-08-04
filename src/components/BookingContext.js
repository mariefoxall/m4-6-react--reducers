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
        selectedSeatId: action.seatIndex,
        price: action.price,
      };
    }
    default:
      return state;
  }
};

// const exampleReducer = (currentState, action) => {
//     const newState = {...currentState}
//     const newState = currentState
//     switch (action.type) {
//         case "begin-booking-process": {
//             newState.price = 100
//             break;
//         }
//         default:
//            break;
//       }

//     return newState
// }

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({ type: "begin-booking-process", ...data });
  };

  return (
    <BookingContext.Provider
      value={{ state, actions: { beginBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};
