import React from "react";
import { SeatContext } from "./SeatContext";

import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  const fetchSeatAvailability = () => {
    fetch("/api/seat-availability")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      });
  };

  React.useEffect(() => {
    fetchSeatAvailability();
  }, []);

  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows.
    </>
  );
}

export default App;
