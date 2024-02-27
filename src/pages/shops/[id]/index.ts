import { lazy } from "react";

const ShopPage = {
  path(id = ":id", subpage = "") {
    return `/shops/${id}/${subpage}`;
  },
  Render: lazy(() => import("./ShopPage")),
};

export default ShopPage;
