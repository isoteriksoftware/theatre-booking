import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router";
import Index from "./pages";
import Admin from "./pages/admin";
import AdminLogin from "./pages/admin-login";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Switch>
        <Route path="/admin/login">
          <AdminLogin/>
        </Route>
        <Route path="/admin">
          <Admin/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/logout">
          <Logout/>
        </Route>
        <Route path="/">
          <Index/>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;