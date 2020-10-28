import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
        main: '#1DB954',
        contrastText: '#ffffff'
        },
        secondary: {
        main: '#191414',
        },
    }
});

export default theme;