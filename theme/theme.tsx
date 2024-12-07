"use client";
import { Open_Sans } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { APP_COLORS } from "./colors/colors";

const openSans = Open_Sans({
  weight: ["400", "700", "800", "300", "600", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const defaultTheme = createTheme({});
const theme = createTheme({
  palette: {
    primary: {
      main: APP_COLORS.primary,
    },
    secondary: {
      main: APP_COLORS.secondary,
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
      styleOverrides: {
        colorInherit: {
          backgroundColor: defaultTheme.palette.common.white,
          borderBottom: `1px solid ${defaultTheme.palette.divider}`,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontWeight: 500,
          fontSize: 14,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        sizeSmall:{
          textTransform:"none"
        },
        startIcon:{
          marginRight:5
        }
      },
    },
  },
});

export default theme;
