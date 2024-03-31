import { createTheme } from '@mui/material';
import { blue, orange, green, red, grey } from '@mui/material/colors';
import './main.css';

const theme = createTheme({
    palette: {
        primary: {
            // main: blue[500],
            main: blue[900],
            light: blue[700],
            dark: blue[300],
        },
        secondary: {
            main: grey[900],
        },
        success: {
            main: green[500],
        },
        error: {
            main: red[500],
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 0,
                },
            },
            defaultProps: {
                variant: 'contained',
                color: 'primary',
                disableElevation: true,
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: 'Poppins, sans-serif',
                },
            },
        },
    },
});

export default theme;
