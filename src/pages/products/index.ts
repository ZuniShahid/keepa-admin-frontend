import { lazy } from "react";

const ProductsPage = {
  path: "/products",
  Render: lazy(() => import("./ProductsPage")),
};

export default ProductsPage;
