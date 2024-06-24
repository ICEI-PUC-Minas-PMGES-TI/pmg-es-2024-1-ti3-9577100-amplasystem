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

import { Cliente } from "@/types/model/Cliente";
import { InfoOutlined } from "@mui/icons-material";
import {
  DialogActions,
  FormHelperText,
  Select,
  Option,
  ModalOverflow,
} from "@mui/joy";

const ClientesPage = () => {
  const breadcrumbs: Breadcrumb[] = [
    { text: "Dashboard", href: "#dashboard", icon: HomeRoundedIcon },
    { text: "Clientes" },
  ];

  const actions: Action[] = [
    {
      label: "Importar",
      icon: <UploadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => setModalCliente(true), // Abre o modal ao clicar
    },
    {
      label: "Exportar",
      icon: <DownloadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => setModalCliente(true), // Abre o modal ao clicar
    },
    {
      label: "Adicionar cliente",
      icon: <AddIcon />,
      color: "success",
      variant: "solid",
      size: "sm",
      onClick: () => setModalCliente(true), // Abre o modal ao clicar
    },
  ];

  const vendedores = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
    { id: 3, nome: "José" },
  ];

  const [modalCliente, setModalCliente] = useState<boolean>(false);
  const [clienteData, setClienteData] = useState<Cliente>({
    cnpj: "",
    nomeFantasia: "",
    idVendedor: null,
    telefone: "",
    endereco: {
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: null,
      complemento: null,
    },
  });
  const [errors, setErrors] = useState({
    cnpj: "",
    nomeFantasia: "",
    idVendedor: "",
    telefone: "",
    endereco: {
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
    },
  });
  const handleModalSubmit = () => {
    const newErrors = {
      cnpj: "",
      nomeFantasia: "",
      idVendedor: "",
      telefone: "",
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
      },
    };

    if (!clienteData.cnpj) {
      newErrors.cnpj = "CNPJ é obrigatório";
    }

    if (!clienteData.nomeFantasia) {
      newErrors.nomeFantasia = "Nome Fantasia é obrigatório";
    }

    if (!clienteData.idVendedor) {
      newErrors.idVendedor = "Vendedor é obrigatório";
    }

    if (!clienteData.telefone) {
      newErrors.telefone = "Telefone é obrigatório";
    }

    if (!clienteData.endereco?.cep) {
      newErrors.endereco.cep = "CEP é obrigatório";
    }

    if (!clienteData.endereco?.estado) {
      newErrors.endereco.estado = "Estado é obrigatório";
    }

    if (!clienteData.endereco?.cidade) {
      newErrors.endereco.cidade = "Cidade é obrigatório";
    }

    if (!clienteData.endereco?.bairro) {
      newErrors.endereco.bairro = "Bairro é obrigatório";
    }

    if (!clienteData.endereco?.rua) {
      newErrors.endereco.rua = "Rua é obrigatório";
    }

    if (!clienteData.endereco?.numero) {
      newErrors.endereco.numero = "Número é obrigatório";
    }

    setErrors(newErrors);

    if (newErrors.cnpj || newErrors.nomeFantasia || newErrors.idVendedor) {
      return;
    }

    // Está demorando para limpar porque a função é síncrona
    alert(
      `CNPJ: ${clienteData?.cnpj}\n
      Nome Fantasia: ${clienteData?.nomeFantasia}\n
      Vendedor: ${clienteData?.idVendedor}\n
      Telefone: ${clienteData?.telefone}\n
      Endereço: ${clienteData?.endereco?.cep}, ${clienteData?.endereco?.estado}, ${clienteData?.endereco?.cidade}, ${clienteData?.endereco?.bairro}, ${clienteData?.endereco?.rua}, ${clienteData?.endereco?.numero}, ${clienteData?.endereco?.complemento}, cadastrado
      `
    );

    setClienteData({
      cnpj: "",
      nomeFantasia: "",
      idVendedor: null,
      telefone: "",
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: null,
        complemento: null,
      },
    });
  };

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Clientes" actions={actions} />
      <OrderTable />
      <OrderList />

      <Modal open={modalCliente} onClose={() => setModalCliente(false)}>
        <ModalOverflow>
          <ModalDialog>
            <ModalClose />
            <DialogTitle>Adicionar cliente</DialogTitle>
            <DialogContent>
              Após inserir CEP, os dados de endereço serão preenchidos
              automaticamente
            </DialogContent>
            <Stack spacing={2}>
              <FormControl error={Boolean(errors.cnpj)}>
                <FormLabel>CNPJ</FormLabel>
                <Input
                  value={clienteData.cnpj}
                  onChange={(e) =>
                    setClienteData({ ...clienteData, cnpj: e.target.value })
                  }
                />
                {errors.cnpj && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.cnpj}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.nomeFantasia)}>
                <FormLabel>Nome Fantasia</FormLabel>
                <Input
                  value={clienteData.nomeFantasia}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      nomeFantasia: e.target.value,
                    })
                  }
                />
                {errors.nomeFantasia && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.nomeFantasia}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.idVendedor)}>
                <FormLabel>Vendedor</FormLabel>
                <Select
                  value={clienteData.idVendedor}
                  onChange={(_, newValue) =>
                    setClienteData({
                      ...clienteData,
                      idVendedor: newValue,
                    })
                  }
                >
                  {vendedores.map((vendedor) => (
                    <Option key={vendedor.id} value={vendedor.id}>
                      {vendedor.nome}
                    </Option>
                  ))}
                </Select>
                {errors.idVendedor && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.idVendedor}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.telefone)}>
                <FormLabel>Telefone</FormLabel>
                <Input
                  value={clienteData.telefone}
                  onChange={(e) =>
                    setClienteData({ ...clienteData, telefone: e.target.value })
                  }
                />
                {errors.telefone && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.telefone}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.cep)}>
                <FormLabel>CEP</FormLabel>
                <Input
                  value={clienteData.endereco?.cep}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        cep: e.target.value,
                      },
                    })
                  }
                />
                {errors.endereco.cep && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.cep}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.estado)}>
                <FormLabel>Estado</FormLabel>
                <Input
                  value={clienteData.endereco?.estado}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        estado: e.target.value,
                      },
                    })
                  }
                />
                {errors.endereco.estado && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.estado}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.cidade)}>
                <FormLabel>Cidade</FormLabel>
                <Input
                  value={clienteData.endereco?.cidade}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        cidade: e.target.value,
                      },
                    })
                  }
                />
                {errors.endereco.cidade && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.cidade}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.bairro)}>
                <FormLabel>Bairro</FormLabel>
                <Input
                  value={clienteData.endereco?.bairro}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        bairro: e.target.value,
                      },
                    })
                  }
                />
                {errors.endereco.bairro && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.bairro}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.rua)}>
                <FormLabel>Rua</FormLabel>
                <Input
                  value={clienteData.endereco?.rua}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        rua: e.target.value,
                      },
                    })
                  }
                />
                {errors.endereco.rua && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.rua}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.endereco.numero)}>
                <FormLabel>Número</FormLabel>
                <Input
                  value={clienteData.endereco?.numero?.toString()}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        numero: Number(e.target.value),
                      },
                    })
                  }
                />
                {errors.endereco.numero && (
                  <FormHelperText>
                    <InfoOutlined />
                    {errors.endereco.numero}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Complemento (Opcional)</FormLabel>
                <Input
                  value={clienteData.endereco?.complemento?.toString()}
                  onChange={(e) =>
                    setClienteData({
                      ...clienteData,
                      endereco: {
                        ...clienteData.endereco,
                        complemento: e.target.value,
                      },
                    })
                  }
                />
              </FormControl>
            </Stack>
            <DialogActions>
              <Button onClick={handleModalSubmit}>Adicionar</Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setModalCliente(false)}
              >
                Cancelar
              </Button>
            </DialogActions>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
};

export default ClientesPage;
