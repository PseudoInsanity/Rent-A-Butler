import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from '@material-ui/core/DialogActions';


function SubscriptionModal({ open, handleClose, handleSubscribe }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this service, please click your on subscribe button here.
      </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
      </Button>
        <Button onClick={handleSubscribe} color="primary">
          Subscribe
      </Button>
      </DialogActions>
    </Dialog>
  );
}
export default SubscriptionModal;