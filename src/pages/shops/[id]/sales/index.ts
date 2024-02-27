import { lazy } from "react";
import ShopPage from "..";

const ShopSalesPage = {
  subpage: "sales",
  path(id = ":id") {
    return ShopPage.path(id, this.subpage);
  },
  Render: lazy(() => import("./ShopSalesPage")),
};

export default ShopSalesPage;
