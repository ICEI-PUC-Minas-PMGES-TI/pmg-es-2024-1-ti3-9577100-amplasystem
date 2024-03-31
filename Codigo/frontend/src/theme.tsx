import { createTheme } from '@mui/material';
import { teal, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            // main: '#3F51B5',
            main: teal[500],
        },
        secondary: {
            // main: '#f50057',
            main: red[500],
        },
    },
});

export default theme;
