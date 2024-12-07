import React from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormButton from "../form-fields/FormButton";

interface ConformationAlertProps extends DialogProps {
  dialogTitle: string;
  dialogContentText: string;
  btnTitle?: string;
  disableBtn?: boolean;
  onClickOk: () => void;
}

const ConformationAlert = ({
  dialogTitle,
  dialogContentText,
  onClose,
  onClickOk,
  disableBtn,
  btnTitle,
  ...props
}: ConformationAlertProps) => {
  return (
    <Dialog onClose={onClose} {...props}>
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <FormButton
          size="small"
          variant="contained"
          color="error"
          onClick={(event) => {
            onClose?.(event, "backdropClick");
          }}
        >
          Cancel
        </FormButton>
        <FormButton
          variant="contained"
          color="primary"
          disabled={disableBtn}
          onClick={onClickOk}
          autoFocus
          size="small"
        >
          {btnTitle}
        </FormButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConformationAlert;
