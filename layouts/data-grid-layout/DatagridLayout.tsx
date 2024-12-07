"use client";
import React from "react";
import { appBarSize } from "@/utils/constants";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { shouldForwardProp } from "@/utils/actions";

const paginationModel = { page: 0, pageSize: 5 };

const StyledDatagridLayout = styled(Box, {
  shouldForwardProp: (prop) =>
    shouldForwardProp<{ showHeader?: boolean }>(["showHeader"], prop),
})<{ showHeader?: boolean }>(({ theme, showHeader }) => ({
  height: showHeader
    ? `calc(100vh - ${appBarSize + 60}px)`
    : `calc(100vh - ${appBarSize}px)`,
  "& .data-grid-header": {
    minHeight: 60,
    maxHeight: 60,
    width: "100%",
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

interface DatagridLayoutProps {
  showHeader?: boolean;
  children: React.ReactNode;
  headerNode?: React.ReactNode;
}

const DatagridLayout = ({
  showHeader = false,
  children,
  headerNode,
}: DatagridLayoutProps) => {
  return (
    <StyledDatagridLayout showHeader={showHeader}>
      {showHeader && (
        <Box component="div" className="data-grid-header">
          {headerNode}
        </Box>
      )}
      {children}
    </StyledDatagridLayout>
  );
};

export default DatagridLayout;
