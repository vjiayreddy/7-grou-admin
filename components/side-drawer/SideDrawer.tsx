"use client";
import { drawerWidth } from "@/utils/constants";
import Drawer from "@mui/material/Drawer";
import React, { Fragment, useState } from "react";
import { Toolbar, styled } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import menuItems from "./menu-items";
import { Icon } from "@iconify/react";
import CollapseMenu from "./collapse-menu/CollapseMenu";

interface SideDrawerComponentProps {
  open: boolean;
}

const StyledMenuList = styled(List)(({ theme }) => ({
  backgroundColor:'transparent',
  "& .MuiListItemText-root":{
   color:theme.palette.common.white
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 22,
  },
  "& .MuiSvgIcon-root":{
    color:`hsla(0,0%,100%,.38)`

  },
  "& .MuiListItemIcon-root": {
    minWidth: 35,
    "& svg": {
      fontSize: 20,
      color:`hsla(0,0%,100%,.38)`
    },
  },
}));

const SideDrawerComponent = ({ open }: SideDrawerComponentProps) => {

  return (
    <Drawer
      sx={(theme) => ({
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor:theme.palette.secondary.main
        },
      })}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Toolbar />
      <StyledMenuList
        disablePadding={true}
        sx={{ width: "100%", maxWidth: 360}}
        aria-labelledby="nested-list-subheader"
      >
        {menuItems.items.map((menu) => (
          <Fragment key={menu.id}>
            {menu.type === "single" && (
              <ListItemButton key={menu.id}>
                <ListItemIcon>
                  <Icon icon={menu.icon} />
                </ListItemIcon>
                <ListItemText primary={menu.title} />
              </ListItemButton>
            )}
            {menu.type === "collapse" && <CollapseMenu menu={menu} />}
          </Fragment>
        ))}
      </StyledMenuList>
    </Drawer>
  );
};

export default SideDrawerComponent;
