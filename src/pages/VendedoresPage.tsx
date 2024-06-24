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
import { Breadcrumb } from "@/types/common/Breadcrumb";

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
import { Vendedor } from "@/types/model/Vendedor";
import { Cargo } from "@/enums/Cargo.ts";

const VendedoresPage = () => {
  const breadcrumbs: Breadcrumb[] = [
    { text: "Dashboard", href: "#dashboard", icon: HomeRoundedIcon },
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
      onClick: () => setModalVendedor(true),
    },
  ];

  const [modalAdicionarVendedor, setModalVendedor] = useState(false);
  const [vendedorData, setVendedorData] = useState<Vendedor>({
    nome: "",
    email: "",
    cargo: Cargo.VENDEDOR,
  });
  const [errors, setErrors] = useState({ nome: "", email: "", cargo: "" });

  const handleVendedorModalSubmit = () => {
    const newErrors = { nome: "", email: "", cargo: "" };
    if (!vendedorData.nome) newErrors.nome = "Nome é obrigatório";
    if (!vendedorData.email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(vendedorData.email))
      newErrors.email = "Email inválido";
    if (!vendedorData.cargo) newErrors.cargo = "Cargo é obrigatório";

    setErrors(newErrors);

    if (newErrors.nome || newErrors.email || newErrors.cargo) {
      return;
    }

    // Está demorando para limpar porque a função é síncrona
    alert(
      `Nome: ${vendedorData?.nome}\nEmail: ${vendedorData?.email}\nCargo: ${vendedorData?.cargo}, cadastrado`
    );

    setVendedorData({ nome: "", email: "", cargo: Cargo.VENDEDOR });
  };

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Vendedores" actions={actions} />
      <OrderTable />
      <OrderList />

      <Modal
        open={modalAdicionarVendedor}
        onClose={() => setModalVendedor(false)}
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
                value={vendedorData?.nome}
                onChange={(e) =>
                  setVendedorData({ ...vendedorData, nome: e.target.value })
                }
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
              <Input
                value={vendedorData.email}
                onChange={(e) =>
                  setVendedorData({ ...vendedorData, email: e.target.value })
                }
              />
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
                value={vendedorData.cargo}
                onChange={(_, newValue) =>
                  setVendedorData({
                    ...vendedorData,
                    cargo: newValue as Cargo,
                  })
                }
              >
                <Option value={Cargo.VENDEDOR}>Vendedor</Option>
                <Option value={Cargo.ADMINISTRADOR}>Administrador</Option>
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
              onClick={handleVendedorModalSubmit}
            >
              Cadastrar
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setModalVendedor(false)}
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
