import { APP_COLORS } from "@/theme/colors/colors";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React from "react";

const StyledLiveResults = styled(Box)(({ theme }) => ({
  width: "100%",
  minHeight: 50,
  maxHeight: 50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: 10,
  paddingRight: 10,
  backgroundColor: theme.palette.primary.main,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  "& .MuiTypography-h6": {
    fontWeight: 800,
    fontSize: 18,
    color:theme.palette.common.white
  },
  "& .live": {
    minWidth: 20,
    color: theme.palette.common.white,
    backgroundColor: APP_COLORS.liveGreen,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize:12,
    paddingTop:1,
    paddingBottom:1,
    paddingLeft:8,
    paddingRight:8,
    borderRadius:10
  },
}));

const LiveResults = () => {
  return (
    <StyledLiveResults>
      <Box sx={{ width: "100%" }}>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Box component="div" className="live">
              LIVE
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h6">MATKA RESULTS</Typography>
          </Grid>
        </Grid>
      </Box>
    </StyledLiveResults>
  );
};

export default LiveResults;
