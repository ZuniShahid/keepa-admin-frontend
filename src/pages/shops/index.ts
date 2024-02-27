import { lazy } from "react";

const ShopsPage = {
  path: "/shops",
  Render: lazy(() => import("./ShopsPage")),
};

export default ShopsPage;
