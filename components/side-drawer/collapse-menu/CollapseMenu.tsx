import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface CollapseMenuProps {
  menu: any;
}

const CollapseMenu = ({ menu }: CollapseMenuProps) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);

  return (
    <Fragment>
      <ListItemButton
        onClick={() => setOpenCollapse(!openCollapse)}
        key={menu.id}
      >
        <ListItemIcon>
          <Icon icon={menu.icon} />
        </ListItemIcon>
        <ListItemText primary={menu.title} />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.childrens.map((item: any) => (
            <ListItemButton key={item.id} sx={{ pl: 6 }}>
              <ListItemIcon>
                <Icon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default CollapseMenu;
