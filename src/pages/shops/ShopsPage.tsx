import { useCallback, useMemo, useState } from "react";
import PageTitle from "../../components/shared/PageTitle";
import { useGetShopsQuery } from "../../store/shops/shops.api.slice";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../../components/shared/Toast";
import ShopsList from "../../components/shops/ShopsList";
import sortBy from "lodash/sortBy";
import AddNewShopDialog from "../../components/shops/AddNewShopDialog";

const ShopsPageRender = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useGetShopsQuery();

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const onSuccess = useCallback(() => {
    closeDialog();
    setTimeout(refetch, 3000);
  }, [closeDialog, refetch]);

  const content = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return (
      <>
        <ShopsList data={sortBy(data, "name")} />
        <Toast />
      </>
    );
  }, [data, isLoading]);

  return (
    <>
      <PageTitle title="Shops" />
      {content}
      <AddNewShopDialog isOpen={isDialogOpen} onClose={closeDialog} onSuccess={onSuccess} />
    </>
  );
};

export default ShopsPageRender;
