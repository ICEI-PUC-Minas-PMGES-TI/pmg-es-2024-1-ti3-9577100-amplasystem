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

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  ModalClose,
  FormHelperText,
  Select,
  Option,
  Box,
} from "@mui/joy";

const VendedoresPage = () => {
  const breadcrumbs = [
    { text: "Home", href: "#home", icon: HomeRoundedIcon },
    { text: "Dashboard", href: "#dashboard" },
    { text: "Vendedores" },
  ];

  const actions: Action[] = [
    {
      label: "Importar",
      icon: <UploadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => alert("Importar clicked"),
    },
    {
      label: "Exportar",
      icon: <DownloadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => alert("Exportar clicked"),
    },
    {
      label: "Adicionar vendedor",
      icon: <AddIcon />,
      color: "success",
      size: "sm",
      variant: "solid",
      onClick: () => setModalAdicionarVendedor(true),
    },
  ];

  const [modalAdicionarVendedor, setModalAdicionarVendedor] = useState(false);

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Vendedores" actions={actions} />
      <OrderTable />
      <OrderList />

      <Modal
        open={modalAdicionarVendedor}
        onClose={() => setModalAdicionarVendedor(false)}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Adicionar vendedor</DialogTitle>
          <DialogContent>Fill in the information of the project.</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              alert("Vendedor cadastrado com sucesso");
              setModalAdicionarVendedor(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input autoFocus />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Cargo</FormLabel>
                <Select>
                  <Option value="vendedor">Vendedor</Option>
                  <Option value="administrador">Administrador</Option>
                </Select>
                <FormHelperText>
                  Apenas administradores, podem cadastrar novos vendedores
                </FormHelperText>
              </FormControl>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  flexDirection: { xs: "column", sm: "row-reverse" },
                }}
              >
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setModalAdicionarVendedor(false)}
                >
                  Cadastrar
                </Button>
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setModalAdicionarVendedor(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default VendedoresPage;
