// material-ui
import { useTheme } from "@mui/material/styles";
import { Divider, List, Typography } from "@mui/material";
import NavCollapse from "../nav-collapse/NavCollapse";
import NavItem from "../nav-items/NavItems";
// project imports
// import NavItem from '../NavItem';
// import NavCollapse from '../NavCollapse';


interface NavGroupProps {
    menuItem:any
}

// types




const NavGroup = ({menuItem}:NavGroupProps) => {
  const theme = useTheme();

  // menu list collapse & items
  const items = menuItem.children?.map((menu:any) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
            menuItem.title && (
            <Typography
              variant="caption"
             // sx={{ ...theme.typography.menuCaption }}
              display="block"
              gutterBottom
            >
              {menuItem.title}
              {menuItem.caption && (
                <Typography
                  variant="caption"
                  //sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {menuItem.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
