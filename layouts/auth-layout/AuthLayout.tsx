"use client";
import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledAuthLayout = styled(Box)(({ theme }) => ({
  height: "100dvh",
  width: "100dvw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <StyledAuthLayout>{children}</StyledAuthLayout>;
};

export default AuthLayout;
