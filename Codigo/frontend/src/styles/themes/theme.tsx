import { createTheme } from '@mui/material';
import { blue, orange, green, red, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[900],
            light: blue[700],
            dark: blue[800],
        },
        // secondary: {
        //     main: orange[500],
        //     light: orange[700],
        //     dark: orange[300],
        // },
        secondary: {
            main: '#030303',
            light: grey[700],
            dark: grey[300],
        },
        success: {
            main: green[800],
        },
        error: {
            main: red[800],
        },
        warning: {
            main: orange[800],
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: grey[100],
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 2,
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: 16,
                },
            },
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: 16,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'uppercase',
                    borderRadius: 2,
                    padding: '10px 20px',
                    // ':hover': {
                    //     backgroundColor: blue[800],
                    // },
                },
                iconSizeSmall: {
                    '& > *:first-of-type': {
                        fontSize: 16,
                        opacity: 0.8,
                    },
                },
                iconSizeMedium: {
                    '& > *:first-of-type': {
                        fontSize: 18,
                        opacity: 0.8,
                    },
                },
                iconSizeLarge: {
                    '& > *:first-of-type': {
                        fontSize: 20,
                        opacity: 0.8,
                    },
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
                    borderRadius: 2,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 2,
                    borderColor: grey[300],
                    borderWidth: 20,
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
                    fontFamily: 'Inter, sans-serif',
                },
            },
        },
    },
});

export default theme;
