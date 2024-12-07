"use client";
import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { APP_COLORS } from "@/theme/colors/colors";

const StyledHomeSection = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: 60,
  maxHeight: 60,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiTypography-subtitle1": {
    fontWeight: 700,
    fontSize: 16,
  },
  "& .info": {
    flex: 1,
    height: 60,
    backgroundColor: APP_COLORS.yellowLemon,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiTypography-body1": {
     fontSize:14
    },
  },
  "& .whatapp": {
    height: 60,
    width: "50%",
    flex: 1,
    backgroundColor: "#128C7E",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      fontSize: 24,
      color: theme.palette.common.white,
      marginRight: 5,
    },
    "& .MuiTypography-subtitle1": {
      color: theme.palette.common.white,
    },
  },
}));

const HomeInfoSection = () => {
  return (
    <StyledHomeSection>
      <Box component="div" className="info">
        <Box>
          <Typography sx={(theme)=>({
            color:theme.palette.error.main
          })} variant="subtitle1">Sri Devi</Typography>
        </Box>
        <Box>
          <Typography variant="body1">245 - 13 - 580</Typography>
        </Box>
      </Box>
      <Box component="div" className="whatapp">
        <Icon icon="ri:whatsapp-fill" />
        <Typography variant="subtitle1">8719817314</Typography>
      </Box>
    </StyledHomeSection>
  );
};

export default HomeInfoSection;
