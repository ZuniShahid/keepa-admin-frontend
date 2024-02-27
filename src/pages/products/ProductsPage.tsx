import { useMemo } from "react";
import ProductsTable from "../../components/products/ProductsTable";
import PageTitle from "../../components/shared/PageTitle";
import { useGetItemsQuery } from "../../store/items/items.api.slice";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsPage = () => {
  const { data, isLoading } = useGetItemsQuery();

  const tableContent = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return <ProductsTable data={data.items} maxHeight={1000} />;
  }, [data, isLoading]);

  return (
    <>
      <PageTitle title="Products" />
      {tableContent}
    </>
  );
};

export default ProductsPage;
