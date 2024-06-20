import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import AddIcon from "@mui/icons-material/Add";

import OrderTable from "@/components/OrderTable";
import OrderList from "@/components/OrderList";

const VendedoresPage = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Breadcrumbs
          size="sm"
          aria-label="breadcrumbs"
          separator={<ChevronRightRoundedIcon />}
          sx={{ pl: 0 }}
        >
          <Link
            underline="none"
            color="neutral"
            href="#some-link"
            aria-label="Home"
          >
            <HomeRoundedIcon />
          </Link>
          <Link
            underline="hover"
            color="neutral"
            href="#some-link"
            fontSize={12}
            fontWeight={500}
          >
            Dashboard
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Vendedores
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Vendedores
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            color="neutral"
            startDecorator={<UploadIcon />}
            size="sm"
            variant="soft"
          >
            Importar
          </Button>
          <Button
            color="neutral"
            startDecorator={<DownloadIcon />}
            size="sm"
            variant="soft"
          >
            Exportar
          </Button>
          <Button color="primary" startDecorator={<AddIcon />} size="sm">
            Adicionar vendedor
          </Button>
        </Box>
      </Box>
      <OrderTable />
      <OrderList />
    </>
  );
};

export default VendedoresPage;
