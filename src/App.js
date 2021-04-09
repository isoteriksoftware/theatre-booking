import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router";
import Index from "./pages";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Switch>
        <Route path="/">
          <Index/>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;