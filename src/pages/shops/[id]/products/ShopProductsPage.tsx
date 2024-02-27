import { useParams } from "react-router-dom";
import { useGetShopQuery } from "../../../../store/shops/shops.api.slice";
import { useMemo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ProductsTable from "../../../../components/products/ProductsTable";

const ShopProductsPageRender = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetShopQuery(id as string, { skip: !id });

  const content = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return <ProductsTable data={data.items} maxHeight={800} />;
  }, [data, isLoading]);

  return content;
};

export default ShopProductsPageRender;
