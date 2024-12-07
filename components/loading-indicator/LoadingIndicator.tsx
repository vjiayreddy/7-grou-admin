import { shouldForwardProp } from "@/utils/actions";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";


interface StyledLoadingIndicatorProps {
  calcHeight?:number;
}

const StyledLoadingIndicator = styled(Box, {
  shouldForwardProp: (prop: string) =>
    shouldForwardProp<{ calcHeight?: number }>(["calcHeight"], prop),
})<{ calcHeight?: number }>(({ theme, calcHeight }) => ({
  position: "absolute",
  width: "100%",
  height: "calc(100% - 64px)",
  ...(calcHeight && {
    calcHeight: `calc(100% - ${calcHeight})px`,
  }),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const LoadingIndicator = ({calcHeight}:StyledLoadingIndicatorProps) => {
  return (
    <StyledLoadingIndicator calcHeight={calcHeight}>
      <CircularProgress size={30} />
    </StyledLoadingIndicator>
  );
};

export default LoadingIndicator;
