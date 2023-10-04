import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItem from "@mui/material/ListItem";
import CategoryIcon from '@mui/icons-material/Category';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Path from "../Common/Path";
import Collapse from '@mui/material/Collapse';
import { Link, useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
// import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InventoryIcon from '@mui/icons-material/Inventory';
// import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

export default function Layout (props) {
  const { content } = props;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const [open, setOpen] = React.useState(true);

  const handleClick= () => {
    setOpen(!open);
  };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Link to={Path.Dashboard}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Path.Dashboard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>
        <Link to={Path.user}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Path.user}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"User"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>

      <Divider />
      <List>

        <ListItem disablePadding>
          <ListItemButton selected={location.pathname === Path.AddproductScreen} onClick={handleClick}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary={"Product"} />
            {open ? <ExpandLess /> : <ExpandMore />}

          </ListItemButton>
        </ListItem>


        <Collapse in={open} timeout="auto" unmountOnExit>
          <Link to={Path.AddproductScreen}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.AddproductScreen}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Product" />
              </ListItemButton>
            </List>
          </Link>
          <Divider />


          <Link to={Path.previewProducts}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.previewProducts}>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Show Product" />
              </ListItemButton>
            </List>
          </Link>

          <Divider />

          <Link to={Path.ProductsCategory}>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} selected={location.pathname === Path.ProductsCategory}>
                <ListItemIcon>
                <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItemButton>
            </List>
          </Link>
        </Collapse>
      </List>


      <Divider />
      <List>
        <Link to={Path.login}>
          <ListItem disablePadding>
            <ListItemButton selected={location.pathname === Path.login}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div >
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `100%` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: "100000",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
