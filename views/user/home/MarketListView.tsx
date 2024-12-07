import { Box, Grid, Typography, styled } from "@mui/material";
import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import ListItem from "./MarketListItem";
import { market } from "@/typescript/types";

const StyledTimeHeader = styled(Box)(({ theme }) => ({
  padding: 3,
  backgroundColor: theme.palette.secondary.main,
  "& .MuiTypography-body2": {
    fontSize: 9.5,
    color: theme.palette.common.white,
  },
}));
const StyledListItems = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: 10,
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .icon-section": {
    minWidth: 60,
    maxWidth: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 35,
    },
  },
  "& .content": {
    flex: 1,
    padding: 10,
    "& .MuiTypography-h6": {
      fontSize: 18,
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
  },
}));

interface ListViewProps {
  data: market[];
}

const ListView = ({ data }: ListViewProps) => {
  return (
    <Fragment>
      {data.map((item) => (
        <ListItem data={item} key={item._id} />
      ))}
    </Fragment>
  );
};

export default ListView;
