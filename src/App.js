import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import Gallery from './components/Gallery'
import store from './redux/store'
import { createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import './App.css'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Cat Gallery</Typography>
          </Toolbar>
        </AppBar>
        <Gallery />
      </ThemeProvider>
    </Provider>
  );
}

export default App;