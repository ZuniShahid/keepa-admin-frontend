import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./pages/routes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
