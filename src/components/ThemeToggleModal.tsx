import React from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Button from "@mui/joy/Button";

interface ThemeToggleModalProps {
  open: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
  currentTheme: "light" | "dark";
}

const ThemeToggleModal: React.FC<ThemeToggleModalProps> = ({
  open,
  onClose,
  onToggleTheme,
  currentTheme,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={onClose}
          sx={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <CloseRoundedIcon />
        </IconButton>
        <Typography component="h2">Configurações</Typography>
        <Typography>Toggle between light and dark mode:</Typography>
        <Button onClick={onToggleTheme} sx={{ mt: 2 }}>
          Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </ModalDialog>
    </Modal>
  );
};

export default ThemeToggleModal;
