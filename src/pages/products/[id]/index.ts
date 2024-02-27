import { lazy } from "react";

const ProductPage = {
  path(id = ":id") {
    return `/products/${id}`;
  },
  Render: lazy(() => import("./ProductPage")),
};

export default ProductPage;
