import React from "react";
import { useLocation, Link } from "react-router-dom";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FactoryIcon from "@mui/icons-material/Factory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "@/components/util/ColorSchemeToggle";
import { closeSidebar } from "@/utils/toogle.ts";
import AmplaLogo from "@/components/common/AmplaLogo";

const Toggler = ({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: ".2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const usuario = {
    nome: "Vendedor 1",
    email: "vendedor1@gmail.com",
  };

  const usuarioInicial = usuario.nome.charAt(0).toUpperCase();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="plain" color="neutral" size="sm">
          <AmplaLogo />
        </IconButton>
        <Typography level="title-lg">AmplaSystem</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List size="sm" className="Sidebar">
          <ListItem>
            <ListItemButton
              component={Link}
              to="/"
              selected={location.pathname === "/"}
            >
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link}
              to="/vendedores"
              selected={location.pathname === "/vendedores"}
            >
              <HandshakeIcon />
              <ListItemContent>
                <Typography level="title-sm">Vendedores</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link}
              to="/clientes"
              selected={location.pathname === "/clientes"}
            >
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Clientes</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AttachMoneyIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Finanças</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>Receitas e despesas</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Ordens de compra</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Pedidos faturados</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton
              component={Link}
              to="/industrias"
              selected={location.pathname === "/industrias"}
            >
              <FactoryIcon />
              <ListItemContent>
                <Typography level="title-sm">Indústrias</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          className="Sidebar"
          sx={{
            mt: "auto",
            flexGrow: 0,
          }}
        >
          <ListItem>
            <ListItemButton
              component={Link}
              to="/configuracoes"
              selected={location.pathname === "/configuracoes"}
            >
              <SettingsRoundedIcon />
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="solid" size="sm" color="primary">
          {usuarioInicial}
        </Avatar>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{usuario.nome}</Typography>
          <Typography level="body-xs">{usuario.email}</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
};

export default Sidebar;
