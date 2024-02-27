import PageTitle from "../../components/shared/PageTitle";
import Toast from "../../components/shared/Toast";
import SyncItemsButton from "../../components/sync/SyncItemsButton";

const HomePage = () => {
  return (
    <>
      <PageTitle title="Welcome to Keepa Admin!" />
      <SyncItemsButton />
      <Toast />
    </>
  );
};

export default HomePage;
