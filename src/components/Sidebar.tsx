import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FactoryIcon from '@mui/icons-material/Factory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import { closeSidebar } from '@/utils/toogle.ts';

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
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="plain" color="neutral" size="sm">
          <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M31.9576 5.46139e-06C34.2902 0.00592587 35.5112 2.615 35.5714 2.74793L63.8642 63.7075C61.4875 58.6195 55.8773 48.3203 45.8393 42.6372C39.7679 39.2008 34.5603 38.855 33.3393 38.796C26.2924 38.4503 21.0759 41.145 18.8304 42.3417C8.0625 48.0739 2.21429 59.0744 0 63.8079L28.2054 3.0434C28.9353 1.17304 30.3862 -0.00292423 31.9576 5.46139e-06ZM31.9859 18C32.7634 18.002 33.1704 18.858 33.1905 18.9017L40 34C39.7296 33.4227 39.6534 33.2401 39.5172 33.1612C39.2682 33.0169 38.8184 33.2193 36.6131 31.9903C34.5893 30.8627 32.8534 30.7493 32.4464 30.7299C30.0975 30.6165 28.3586 31.5007 27.6101 31.8934C25.2609 33.1244 24.7565 32.9811 24.4815 33.1706C24.3363 33.2706 24.255 33.4634 24 34C25.567 30.6768 26.4673 28.588 27.3676 26.4992C28.2679 24.4103 29.1682 22.3215 30.7351 18.9986C30.9784 18.3849 31.4621 17.999 31.9859 18Z"
              fill="url(#paint0_linear_102_137)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_102_137"
                x1="32"
                y1="-8.94837e-07"
                x2="44.2941"
                y2="59.458"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF3D00" />
                <stop offset="0.5" stopColor="#FF7300" />
                <stop offset="0.99" stopColor="#FFC700" />
              </linearGradient>
            </defs>
          </svg>
        </IconButton>
        <Typography level="title-lg">AmplaSystem</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            // '--ListItem-radius': (theme) => theme.vars.radius.xs,
          }}
        >
          <ListItem>
            <ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/vendedores" selected={location.pathname === '/vendedores'}>
              <HandshakeIcon />
              <ListItemContent>
                <Typography level="title-sm">Vendedores</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton component={Link} to="/clientes" selected={location.pathname === '/clientes'}>
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
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
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
            <ListItemButton component={Link} to="/industrias" selected={location.pathname === '/industrias'}>
              <FactoryIcon />
              <ListItemContent>
                <Typography level="title-sm">Indústrias</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            // '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton component={Link} to="/configuracoes" selected={location.pathname === '/configuracoes'}>
              <SettingsRoundedIcon />
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}

export default Sidebar;
