import { useParams } from "react-router-dom";
import { useGetShopQuery } from "../../../../store/shops/shops.api.slice";
import { useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ShopSalesTable from "../../../../components/shops/ShopSalesTable";

const ShopSalesPageRender = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetShopQuery(id as string, { skip: !id });

  const content = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return <ShopSalesTable sales={data.sales} />;
  }, [data, isLoading]);

  return content;
};

export default ShopSalesPageRender;
