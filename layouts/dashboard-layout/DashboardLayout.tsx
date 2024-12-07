"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarComponent from "@/components/app-bar/AppBar";
import SideDrawerComponent from "@/components/side-drawer/SideDrawer";
import { appBarSize, drawerWidth } from "@/utils/constants";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  paddingTop: appBarSize,
  minHeight: "100vh",
  overflowY:'hidden',
  backgroundColor: theme.palette.common.white,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent open={open} handleDrawer={() => setOpen(!open)} />
      <SideDrawerComponent open={open} />
      <Main open={open}>{children}</Main>
    </Box>
  );
}
