import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledNoDataFoundComponent = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

interface NoDataFoundComponentProps {
  message: string;
}

const NoDataFoundComponent = ({ message }: NoDataFoundComponentProps) => {
  return (
    <StyledNoDataFoundComponent>
      <Typography textAlign="center">{message}</Typography>
    </StyledNoDataFoundComponent>
  );
};

export default NoDataFoundComponent;
