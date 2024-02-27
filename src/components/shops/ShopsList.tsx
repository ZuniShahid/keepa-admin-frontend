import { FC, Fragment } from "react";
import { Shop } from "../../store/shops/shops.types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ShopProductsPage from "../../pages/shops/[id]/products";

interface ShopsListProps {
  data: Shop[];
}

const ShopsList: FC<ShopsListProps> = ({ data }) => {
  return (
    <List disablePadding sx={{ bgcolor: "background.paper" }}>
      {data.map(({ id, name }, index) => (
        <Fragment key={index}>
          <ListItem
            secondaryAction={
              <Link to={ShopProductsPage.path(id)}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            }
          >
            <ListItemText primary={name} secondary={id} />
          </ListItem>
          {index < data.length - 1 && <Divider component="li" />}
        </Fragment>
      ))}
    </List>
  );
};

export default ShopsList;
