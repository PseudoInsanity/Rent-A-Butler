import createMuiTheme  from '@material-ui/core/styles/createMuiTheme'; 
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
  
  const theme = createMuiTheme({
    
    palette: {
      type: 'dark',
      primary: {
        main: '#E0E2E1', // White-Grey
        light: '#D0E6DA', // northern light
      },
      secondary: {
        main: '#FFD9DA', // Pail Pink
        light: '#94D1CA', // Pale Robin Egg Blue
      },
      background: {
        main: '#22333B', // Dark Blue-Grey
        light: '#4F565F', // katana grey
      },
      error: {
        main: '#DC3545', // material error
      },
      warning: {
        main: '#4F565F', // material warning
      },
      success: {
        main: '#28A745', // material success
      },
    },
    typography: {
      fontSize: 12,
  
      // FONTS
      fontFamily: [
        'Montserrat',
        'Gotham Pro',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
  
      // HEADERS
      h1: {
        fontFamily: 'Gotham Pro',
      },
      h2: {
        fontFamily: 'Gotham Pro',
      },
      h3: {
        fontFamily: 'Gotham Pro',
      },
      h4: {
        fontFamily: 'Montserrat',
        fontWeight: 700,
      },
      h5: {
        fontFamily: 'Montserrat',
        fontWeight: 800,
      },
      textFields: {
        fontWeight: '400',
        color: '#eee',
      },
    },
  });
  
  const trettonDarkTheme = responsiveFontSizes(theme);
  
  export default trettonDarkTheme;
  