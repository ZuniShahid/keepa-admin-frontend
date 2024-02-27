import { lazy } from "react";
import ShopPage from "..";

const ShopProductsPage = {
  subpage: "products",
  path(id = ":id") {
    return ShopPage.path(id, this.subpage);
  },
  Render: lazy(() => import("./ShopProductsPage")),
};

export default ShopProductsPage;
