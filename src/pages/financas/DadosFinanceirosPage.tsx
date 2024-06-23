import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";

import OrderTable from "@/components/page/OrderTable";
import OrderList from "@/components/page/OrderList";
import PageBreadcrumbs from "@/components/page/PageBreadcrumbs";
import PageHeader from "@/components/page/PageHeader";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Action } from "@/types/common/Action";

const DadosFinanceirosPage = () => {
  const breadcrumbs = [
    { text: "Home", href: "#home", icon: HomeRoundedIcon },
    { text: "Dashboard", href: "#dashboard" },
    { text: "Dados financeiros" },
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
      label: "Adicionar dado financeiro",
      icon: <AddIcon />,
      color: "primary",
      variant: "solid",
      size: "sm",
      onClick: () => alert("Adicionar dado financeiro clicked"),
    },
  ];

  return (
    <>
      <PageBreadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader title="Dados financeiros" actions={actions} />
      <OrderTable />
      <OrderList />
    </>
  );
};

export default DadosFinanceirosPage;
