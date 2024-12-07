import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { styled } from "@mui/material";
import { Icon } from "@iconify/react";

const StyledBottomBarNavigation = styled(BottomNavigation)(({ theme }) => ({
  "& .MuiBottomNavigationAction-root": {
    minWidth: 0,
  },
  "& .MuiBottomNavigationAction-label": {
    fontSize: "10px !important",
  },
  "& .Mui-selected": {
    fontSize: 10,
  },
  "& svg": {
    fontSize: 25,
  },
}));

const BottomBarNavigation = () => {
  const [value, setValue] = React.useState(0);
  return (
    <StyledBottomBarNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Bids" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Transactions" icon={<Icon icon="icon-park-outline:transaction" />} />
      <BottomNavigationAction
        label="Home"
        icon={<Icon  icon="ion:home-outline" />}
      />
      <BottomNavigationAction
        label="Add Fund"
        icon={<Icon icon="fluent:money-hand-24-regular" />}
      />
      <BottomNavigationAction label="Withdraw" icon={<Icon icon="bx:money-withdraw" />} />
    </StyledBottomBarNavigation>
  );
};

export default BottomBarNavigation;
