import React from "react";
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

import ModalCliente from "@/components/page/ModalCliente";
import useFormCliente from "@/hooks/useFormCliente";
import SnackbarComponent from "@/components/common/SnackbarComponent";

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
      onClick: () => setModalCliente(true),
    },
    {
      label: "Exportar",
      icon: <DownloadIcon />,
      color: "neutral",
      size: "sm",
      variant: "soft",
      onClick: () => setModalCliente(true),
    },
    {
      label: "Adicionar cliente",
      icon: <AddIcon />,
      color: "primary",
      variant: "solid",
      size: "sm",
      onClick: () => setModalCliente(true),
    },
  ];

  const vendedores = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
    { id: 3, nome: "Elenias" },
  ];

  const {
    modalCliente,
    setModalCliente,
    clienteData,
    setClienteData,
    errors,
    handleModalSubmit,
    buscaCep,
    snackbar,
    handleSnackbarClose,
  } = useFormCliente();

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Clientes" actions={actions} />
      <OrderTable />
      <OrderList />
      <ModalCliente
        open={modalCliente}
        onClose={() => setModalCliente(false)}
        clienteData={clienteData}
        setClienteData={setClienteData}
        errors={errors}
        handleSubmit={handleModalSubmit}
        vendedores={vendedores}
        buscaCep={buscaCep}
      />
      <SnackbarComponent
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        color={snackbar.color}
        anchorOrigin={snackbar.anchorOrigin}
      />
    </React.Fragment>
  );
};

export default ClientesPage;
