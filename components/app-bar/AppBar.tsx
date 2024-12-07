"use client";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/routes";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useSession } from "next-auth/react";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
interface AppBarComponentProps {
  open?: boolean;
  handleDrawer?: () => void;
}

const AppBarComponent = ({ handleDrawer }: AppBarComponentProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <MuiAppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="sm" disableGutters={true}>
        <Toolbar>
          {pathname === APP_ROUTES.home && (
            <IconButton
              color="inherit"
              aria-label="open-side-menu"
              onClick={handleDrawer}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {pathname !== APP_ROUTES.home && (
            <IconButton
              color="inherit"
              aria-label="open-side-menu"
              onClick={() => router.back()}
              edge="start"
              sx={{ mr: 2 }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          )}

          <Box flexGrow={1}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography lineHeight={1} fontWeight={700} variant="subtitle1">
                  {pathname === APP_ROUTES.home
                    ? session?.user?.token
                      ? `Welcome`
                      : "Home"
                    : "Choose Category "}
                </Typography>
                {pathname === APP_ROUTES.home && (
                  <Typography display="block" variant="caption">
                    {session?.user?.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container>
              <Grid item>
                <IconButton>
                  <Icon icon="mingcute:user-4-line" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBarComponent;
