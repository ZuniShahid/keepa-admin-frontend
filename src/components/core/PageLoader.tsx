import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const PageLoader = () => {
  return (
    <Grid container alignItems="center" height="100vh" justifyContent="center">
      <CircularProgress sx={{ height: "60px !important", width: "60px !important" }} />
    </Grid>
  );
};

export default PageLoader;
