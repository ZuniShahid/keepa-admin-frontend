import { useCallback } from "react";
import LoadingButton from "../shared/LoadingButton";
import toast from "react-hot-toast";
import { useCreateSyncItemsMutation } from "../../store/sync/sync.api.slice";

const SyncItemsButton = () => {
  const [createSyncItems, { isLoading }] = useCreateSyncItemsMutation();

  const onClick = useCallback<() => Promise<void>>(async () => {
    if (
      confirm(
        "Are you sure you want to confirm? This will sync all categories and images of the new products.",
      )
    ) {
      try {
        await createSyncItems({});

        toast.success("Successful!");
      } catch (e) {
        console.error(e);
        toast.success("Something went wrong.");
      }
    }
  }, [createSyncItems]);

  return (
    <LoadingButton disabled={isLoading} isLoading={isLoading} variant="contained" onClick={onClick}>
      Sync items
    </LoadingButton>
  );
};

export default SyncItemsButton;
