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
import SnackbarComponent from "@/components/common/SnackbarComponent";
import ModalIndustria from "@/components/page/ModalIndustria";
import useFormIndustria from "@/hooks/useFormIndustria";

const IndustriasPage = () => {
  const breadcrumbs = [
    { text: "Home", href: "#home", icon: HomeRoundedIcon },
    { text: "Dashboard", href: "#dashboard" },
    { text: "Indústrias" },
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
      label: "Adicionar indústria",
      icon: <AddIcon />,
      color: "primary",
      variant: "solid",
      size: "sm",
      onClick: () => setModalIndustria(true),
    },
  ];

  const {
    modalIndustria,
    setModalIndustria,
    industriaData,
    setIndustriaData,
    errors,
    handleModalSubmit,
    snackbar,
    handleSnackbarClose,
  } = useFormIndustria();

  return (
    <React.Fragment>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Indústrias" actions={actions} />
      <OrderTable />
      <OrderList />
      <ModalIndustria
        open={modalIndustria}
        onClose={() => setModalIndustria(false)}
        industriaData={industriaData}
        setIndustriaData={setIndustriaData}
        errors={errors}
        handleSubmit={handleModalSubmit}
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

export default IndustriasPage;
