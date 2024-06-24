import React from "react";
import { Snackbar, Alert } from "@mui/joy";

interface SnackbarProps {
  open: boolean;
  anchorOrigin: { vertical: "top" | "bottom"; horizontal: "left" | "center" | "right" };
  color: 'danger'
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning';
  onClose: () => void;
  message: string;
}

const SnackbarComponent: React.FC<SnackbarProps> = ({ open, anchorOrigin, color, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert color={color}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;