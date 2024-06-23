import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";
import { ReactNode } from "react";

import OrderTable from "@/components/OrderTable";
import OrderList from "@/components/OrderList";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PageHeader from "@/components/PageHeader";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

const ClientesPage = () => {
  const breadcrumbs = [
    { text: "Home", href: "#home", icon: HomeRoundedIcon },
    { text: "Dashboard", href: "#dashboard" },
    { text: "Clientes" },
  ];

  type Action = {
    label: string;
    icon?: ReactNode;
    color?: "primary" | "neutral" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "plain" | "outlined" | "soft" | "solid";
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
  };

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
      label: "Adicionar cliente",
      icon: <AddIcon />,
      color: "primary",
      size: "sm",
      onClick: () => alert("Adicionar cliente clicked"),
    },
  ];

  return (
    <>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Clientes" actions={actions} />
      <OrderTable />
      <OrderList />
    </>
  );
};

export default ClientesPage;
