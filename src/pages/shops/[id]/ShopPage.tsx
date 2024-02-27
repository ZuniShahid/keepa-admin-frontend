import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/shared/PageTitle";
import { useGetShopQuery } from "../../../store/shops/shops.api.slice";
import { Suspense, useEffect, useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ShopProductsPage from "./products";
import ShopSalesPage from "./sales";
import PageLoader from "../../../components/core/PageLoader";
import ShopPage from ".";

const tabs = [
  { label: "Products", subpage: ShopProductsPage.subpage },
  { label: "Sales", subpage: ShopSalesPage.subpage },
];

const ShopPageRender = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === ShopPage.path(id) || `${pathname}/` === ShopPage.path(id)) {
      navigate(ShopProductsPage.path(id));
    }
  }, [id, pathname, navigate]);

  const activeTabIndex = tabs.findIndex((t) => pathname.endsWith(t.subpage));

  const { data, isLoading } = useGetShopQuery(id as string, { skip: !id });

  const content = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return (
      <>
        <Typography>
          Shop name: <b>{data.name}</b>
        </Typography>
        <Typography mb={4} mt={2}>
          Shop ID: <b>{data.id}</b>
        </Typography>
        <Tabs value={activeTabIndex} sx={{ mb: 4 }}>
          {tabs.map((tab, index) => (
            <Tab component={Link} key={index} label={tab.label} to={tab.subpage} />
          ))}
        </Tabs>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </>
    );
  }, [activeTabIndex, data, isLoading]);

  return (
    <>
      <PageTitle title="Edit Shop" />
      {content}
    </>
  );
};

export default ShopPageRender;
