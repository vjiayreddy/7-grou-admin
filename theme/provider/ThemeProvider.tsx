import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import theme from "../theme";
import { CssBaseline } from "@mui/material";
import { Bounce, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

const MuiThemeProvider = ({ children }: MuiThemeProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ToastContainer />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
