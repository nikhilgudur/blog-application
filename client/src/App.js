import React from "react";
import { Register } from "./components/Register/Register";
import { Home } from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Test from "./components/Test/Test";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#64d8cb",
      main: "#26a69a",
      dark: "#002884",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const styles = {
  main: {
    textAlign: "center",
  },
};

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Test />
        <div style={styles.main}>
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => <Home {...routeProps} />}
            />
            <Route
              path="/login"
              render={(routeProps) => <Login {...routeProps} />}
            />
            <Route
              path="/register"
              render={(routeProps) => <Register {...routeProps} />}
            />
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
