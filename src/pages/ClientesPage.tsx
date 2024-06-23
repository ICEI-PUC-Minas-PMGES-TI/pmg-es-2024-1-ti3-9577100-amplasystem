import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";

import OrderTable from "@/components/page/OrderTable";
import OrderList from "@/components/page/OrderList";
import PageBreadcrumbs from "@/components/page/PageBreadcrumbs";
import PageHeader from "@/components/page/PageHeader";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Action } from "@/types/common/Action";

import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import ModalClose from "@mui/joy/ModalClose";

const ClientesPage = () => {
  const [open, setOpen] = useState(false);

  const breadcrumbs = [
    { text: "Home", href: "#home", icon: HomeRoundedIcon },
    { text: "Dashboard", href: "#dashboard" },
    { text: "Clientes" },
  ];

  const actions: Action[] = [
    {
      label: "Importar",
      icon: <UploadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => setOpen(true), // Abre o modal ao clicar
    },
    {
      label: "Exportar",
      icon: <DownloadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => setOpen(true), // Abre o modal ao clicar
    },
    {
      label: "Adicionar cliente",
      icon: <AddIcon />,
      color: "success",
      variant: "solid",
      size: "sm",
      onClick: () => setOpen(true), // Abre o modal ao clicar
    },
  ];

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Clientes" actions={actions} />
      <OrderTable />
      <OrderList />

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Adicionar cliente</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default ClientesPage;
