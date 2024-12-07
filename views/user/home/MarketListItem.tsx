import { Box, Grid, Typography, styled } from "@mui/material";
import React, { Fragment } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/routes";
import { market } from "@/typescript/types";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { showAuthModel } from "@/redux/reducers/authSlice";

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
      fontSize: 16,
      fontWeight: 700,
      color: theme.palette.primary.main,
    },
  },
}));

interface ListItemProps {
  data: market;
}

const ListItem = ({ data }: ListItemProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const handleNavigation = (_id: string) => {
    debugger;
    if (status === "unauthenticated") {
      dispatch(showAuthModel(true));
    } else {
      router.push(`${APP_ROUTES.categories}?gameRateId=${_id}`);
    }
  };

  return (
    <Fragment>
      <StyledTimeHeader>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="body2" textAlign="center">
              OPEN: {data?.openTime} AM (RESULT DECLARED)
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" textAlign="center">
              CLOSE: {data?.closeTime} PM (00:24:48 LEFT)
            </Typography>
          </Grid>
        </Grid>
      </StyledTimeHeader>
      <StyledListItems>
        <Box
          component="div"
          className="icon-section"
          sx={(theme) => ({
            borderRight: `1px solid ${theme.palette.divider}`,
          })}
        >
          <Icon icon="ph:chart-line-up" />
        </Box>
        <Box component="div" className="content">
          <Typography variant="h6" textAlign="center">
            {data.name}
          </Typography>
          <Typography variant="body1" textAlign="center">
            ***_**_***
          </Typography>
        </Box>
        <Box
          onClick={() => handleNavigation(data._id)}
          component="div"
          className="icon-section"
          sx={(theme) => ({
            borderLeft: `1px solid ${theme.palette.divider}`,
          })}
        >
          <Icon icon="icon-park-solid:play" />
        </Box>
      </StyledListItems>
    </Fragment>
  );
};

export default ListItem;
