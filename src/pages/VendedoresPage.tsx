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
  DialogActions,
} from "@mui/joy";
import { InfoOutlined } from "@mui/icons-material";

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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [errors, setErrors] = useState({ nome: "", email: "", cargo: "" });

  const handleAdicionarVendedor = () => {
    const newErrors = { nome: "", email: "", cargo: "" };

    if (!nome) newErrors.nome = "Nome é obrigatório";
    if (!email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email inválido";
    if (!cargo) newErrors.cargo = "Cargo é obrigatório";

    setErrors(newErrors);

    if (newErrors.nome || newErrors.email || newErrors.cargo) {
      return;
    }

    // Está demorando para limpar porque a função é síncrona
    alert(`Nome: ${nome}\nEmail: ${email}\nCargo: ${cargo}, cadastrado`);

    setNome("");
    setEmail("");
    setCargo("");
  };

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
          <DialogContent>
            Apenas administradores podem cadastrar novos vendedores
          </DialogContent>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.nome)}>
              <FormLabel>Nome</FormLabel>
              <Input
                autoFocus
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              {errors.nome && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.nome}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.email)}>
              <FormLabel>Email</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              {errors.email && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.cargo)}>
              <FormLabel>Cargo</FormLabel>
              <Select
                value={cargo}
                onChange={(_, newValue) => setCargo(newValue ?? "")}
              >
                <Option value="vendedor">Vendedor</Option>
                <Option value="administrador">Administrador</Option>
              </Select>
              {errors.cargo && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.cargo}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
          <DialogActions>
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleAdicionarVendedor()}
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
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default VendedoresPage;
