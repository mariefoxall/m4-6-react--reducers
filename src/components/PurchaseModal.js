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
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);
  const handleClose = () => {
    cancelBookingProcess();
  };
  return (
    <div>
      <Dialog open={state.selectedSeatId !== null} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Purchase Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Seat: {state.selectedSeatId}</p>
            <p>Price: ${state.price}</p>
          </DialogContentText>
        </DialogContent>
        <PurchaseDiv>
          <DialogContent>
            <h4>Enter Payment Details:</h4>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Credit Card"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Expiration"
              type="text"
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
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

export default PurchaseModal;
