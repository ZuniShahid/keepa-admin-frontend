import { lazy } from "react";

const HomePage = {
  path: "/",
  Render: lazy(() => import("./HomePage")),
};

export default HomePage;
