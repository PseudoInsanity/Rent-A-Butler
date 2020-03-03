import {
    createMuiTheme, responsiveFontSizes,
  } from '@material-ui/core/styles';
  
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#002B55', // terminal blue
        light: '#D0E6DA', // northern light
      },
      secondary: {
        main: '#80C565', // leet green
        light: '#E9F6F6', // nordic snow
      },
      background: {
        main: '#26282A', // server rack
        light: '#4F565F', // katana grey
      },
      error: {
        main: '#DC3545', // material error
      },
      warning: {
        main: '#FFC107', // material warning
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
  