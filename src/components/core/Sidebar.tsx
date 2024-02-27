import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { ComponentType } from "react";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import HomePage from "../../pages/home";
import ProductsPage from "../../pages/products";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CategoriesPage from "../../pages/categories";
import ShopsPage from "../../pages/shops";

interface MenuItem {
  Icon: ComponentType;
  text: string;
  to: string;
}

const menuItems: MenuItem[] = [
  { Icon: HomeIcon, text: "Home", to: HomePage.path },
  { Icon: CategoryIcon, text: "Categories", to: CategoriesPage.path },
  { Icon: InventoryIcon, text: "Products", to: ProductsPage.path },
  { Icon: StoreIcon, text: "Shops", to: ShopsPage.path },
];

const MenuItems = () => {
  return (
    <>
      {menuItems.map(({ Icon, text, to }, index) => (
        <ListItem
          disablePadding
          component={NavLink}
          key={index}
          to={to}
          sx={{
            borderRadius: 2,
            "&.active": { backgroundColor: "secondary.main" },
          }}
        >
          <ListItemButton>
            <ListItemIcon sx={{ color: "inherit" }}>
              <Icon />
            </ListItemIcon>
            <ListItemText>
              <Typography>{text}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
};

const Sidebar = () => {
  return (
    <Grid borderRight="1px solid #DADADA" height="100%">
      <Grid container alignItems="center" justifyContent="center" pb={1} pt={3}>
        <Typography color="primary.main" fontSize="3rem" fontWeight={700}>
          KEEPA
        </Typography>
      </Grid>
      <List disablePadding sx={{ padding: "1rem" }}>
        <MenuItems />
      </List>
    </Grid>
  );
};

export default Sidebar;
