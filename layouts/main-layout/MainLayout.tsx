"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/app-bar/AppBar";
import { appBarSize } from "@/utils/constants";
import BottomBarNavigation from "@/components/bottom-bar/BottomBar";
import { useSelector } from "react-redux";
import LoginModel from "@/views/auth/Login";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  width: "100vw",
  maxWidth: theme.breakpoints.values.sm,
  margin: "0 auto",
  paddingTop: appBarSize,
  [theme.breakpoints.only("xs")]: {
    paddingTop: 56,
  },
  height: `calc(100vh)`,
  overflowY: "hidden",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.grey[100],
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  "& .main-content": {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
  },
  "& .footer-section": {
    minHeight: 56,
    maxHeight: 56,
  },
}));

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const authSliceState = useSelector((state: any) => state.authSlice);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent open={false} handleDrawer={() => {}} />
      <Main open={false}>
        <Box component="div" className="main-content">
          {children}
        </Box>
        <Box component="div" className="footer-section">
          <BottomBarNavigation />
        </Box>
      </Main>

      {authSliceState?.isOpenAuthModel && (
        <LoginModel open={authSliceState?.isOpenAuthModel} />
      )}
    </Box>
  );
}
