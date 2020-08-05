import React from "react";
import { BookingContext } from "./BookingContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";

const PurchaseModal = () => {
  const {
    state,
    actions: { cancelBookingProcess, purchaseTicketRequest },
  } = React.useContext(BookingContext);
  const handleClose = () => {
    cancelBookingProcess();
  };

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  let purchaseSeatId = state.selectedSeatId;
  const price = state.price;

  //   console.log(creditCard, expiration);
  return (
    <div>
      <Dialog
        open={purchaseSeatId !== null}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Purchase Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are purchasing <strong>1</strong> ticket for the price of $
            {state.price}.
          </DialogContentText>
          <Table>
            <tbody>
              <tr>
                <th>Row</th>
                <th>Seat</th>
                <th>Price</th>
              </tr>
              <tr>
                <td>{purchaseSeatId !== null && purchaseSeatId.slice(0, 1)}</td>
                <td>{purchaseSeatId !== null && purchaseSeatId.slice(2)}</td>
                <td>${state.price}</td>
              </tr>
            </tbody>
          </Table>
        </DialogContent>
        <PurchaseDiv>
          <DialogContent>
            <h4>Enter Payment Details:</h4>
            <TextField
              onChange={(ev) => setCreditCard(ev.target.value)}
              autoFocus
              margin="dense"
              //   id="name"
              label="Credit Card"
              type="text"
              fullWidth
            />
            <TextField
              onChange={(ev) => setExpiration(ev.target.value)}
              autoFocus
              margin="dense"
              //   id="name"
              label="Expiration"
              type="text"
              fullWidth
            />
            <DialogActions>
              <Button
                onClick={(ev) => {
                  purchaseTicketRequest({
                    purchaseSeatId,
                    creditCard,
                    expiration,
                    price,
                  });
                }}
                color="primary"
              >
                PURCHASE
              </Button>
            </DialogActions>
          </DialogContent>
        </PurchaseDiv>
      </Dialog>
    </div>
  );
};

const PurchaseDiv = styled.div`
  background-color: lightgrey;
`;

const Table = styled.table`
  width: 100%;
  text-align: center;
`;

export default PurchaseModal;
