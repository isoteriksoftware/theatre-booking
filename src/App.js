import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router";
import Index from "./pages";
import Login from "./pages/login";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/">
          <Index/>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;