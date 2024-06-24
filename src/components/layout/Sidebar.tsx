import React, { useState } from "react";
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
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DialogActions from "@mui/joy/DialogActions";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useTheme } from "@/context/ThemeContext";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Tooltip,
} from "@mui/joy";

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
  const { switchTheme } = useTheme();
  const usuarioInicial = usuario.nome.charAt(0).toUpperCase();

  const [modalConfiguracoes, setModalConfiguracoes] = useState(false);
  const [modalConfirmExit, setModalConfirmExit] = useState(false);

  return (
    <React.Fragment>
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 1000,
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
                  <ListItemButton
                    onClick={() => setOpen(!open)}
                    selected={
                      location.pathname.startsWith("/financas") &&
                      open === false
                    }
                  >
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
                  <ListItem
                    sx={{ mt: 0.5 }}
                    component={Link}
                    to="/financas/dados-financeiros"
                  >
                    <ListItemButton
                      selected={
                        location.pathname === "/financas/dados-financeiros"
                      }
                    >
                      <Typography level="title-sm">
                        Dados financeiros
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} to="/financas/ordens-de-compra">
                    <ListItemButton
                      selected={
                        location.pathname === "/financas/ordens-de-compra"
                      }
                    >
                      <Typography level="title-sm">Ordens de compra</Typography>
                    </ListItemButton>
                  </ListItem>
                  <ListItem component={Link} to="/financas/pedidos-faturados">
                    <ListItemButton
                      selected={
                        location.pathname === "/financas/pedidos-faturados"
                      }
                    >
                      <Typography level="title-sm">
                        Pedidos faturados
                      </Typography>
                    </ListItemButton>
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
              <Tooltip
                title="Personalize o sistema!"
                placement="top-start"
                color="primary"
                variant="solid"
              >
                <ListItemButton onClick={() => setModalConfiguracoes(true)}>
                  <SettingsRoundedIcon />
                  <Typography level="title-sm">Configurações</Typography>
                </ListItemButton>
              </Tooltip>
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
          <Tooltip
            title="Sair"
            variant="solid"
            color="danger"
            placement="right"
          >
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={() => setModalConfirmExit(true)}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Sheet>
      <Modal
        open={modalConfiguracoes}
        onClose={() => setModalConfiguracoes(false)}
      >
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Configurações</DialogTitle>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            Será salvo no browser que você está utilizando neste momento.
          </Typography>
          <DialogContent>
            <Stack gap={3}>
              <FormControl>
                <FormLabel>Tema</FormLabel>
                <Select>
                  <Option value="light">Claro</Option>
                  <Option value="dark">Escuro</Option>
                  <Option value="system">Sistema</Option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Estilo</FormLabel>
                <Select>
                  <Option value="chakraTheme" onClick={() => { switchTheme('chakra') }}>Chakra UI</Option>
                  <Option value="fluentTheme" onClick={() => { switchTheme('fluent') }}>Fluent UI</Option>
                  <Option value="joyTheme" onClick={() => { switchTheme('ibm') }}>IBM UI</Option>
                  <Option value="antTheme" onClick={() => { switchTheme('custom') }}>Custom UI</Option>
                </Select>
                <FormHelperText>
                  Altera a estilização de cada componente.
                </FormHelperText>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="primary"
              onClick={() => setModalConfiguracoes(false)}
            >
              Aplicar alterações
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setModalConfiguracoes(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Modal open={modalConfirmExit} onClose={() => setModalConfirmExit(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmar saída
          </DialogTitle>
          <Divider />
          <DialogContent>
            Tem certeza de que deseja sair do AmplaSystem?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setModalConfirmExit(false)}
            >
              Sair do sistema
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setModalConfirmExit(false)}
            >
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};

export default Sidebar;
