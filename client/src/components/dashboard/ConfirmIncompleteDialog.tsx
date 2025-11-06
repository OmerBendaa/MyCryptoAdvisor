import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";

interface ConfirmIncompleteDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmIncompleteDialog = ({ open, onCancel, onConfirm }: ConfirmIncompleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Continue with incomplete answers?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You didn't answer all the questions. You can continue now and update your preferences later.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={onConfirm}>
          Yes, save anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmIncompleteDialog;


