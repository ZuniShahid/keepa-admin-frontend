import { lazy } from "react";

const CategoriesPage = {
  path: "/categories",
  Render: lazy(() => import("./CategoriesPage")),
};

export default CategoriesPage;
