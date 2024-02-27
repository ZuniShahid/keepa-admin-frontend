import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Grid container height="100vh">
      <Grid sx={{ width: 300 }}>
        <Sidebar />
      </Grid>
      <Grid flex={1} px={6} py={5}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
