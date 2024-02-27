import { FC, useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "../shared/LoadingButton";
import TextField from "@mui/material/TextField";
import { useCreateShopMutation } from "../../store/shops/shops.api.slice";
import toast from "react-hot-toast";

interface NewShopFormType {
  name: string;
}

interface AddNewShopDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddNewShopDialog: FC<AddNewShopDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<NewShopFormType>();

  useEffect(() => {
    if (isOpen) {
      reset({ name: "" });
    }
  }, [isOpen, reset]);

  const [createShop, { isLoading }] = useCreateShopMutation();

  const onSubmit = useCallback<SubmitHandler<NewShopFormType>>(
    async (formValues) => {
      if (confirm("Are you sure you want to add new Shop?")) {
        try {
          await createShop({ body: { name: formValues.name } });

          toast.success("Successful!");

          onSuccess();
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong.");
        }
      }
    },
    [createShop, onSuccess],
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Grid noValidate component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add New Shop</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Grid mt={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} fullWidth required label="Name" />}
            />
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <LoadingButton
            disabled={!isDirty || isLoading}
            isLoading={isLoading}
            type="submit"
            variant="contained"
            sx={{ width: 96 }}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Grid>
    </Dialog>
  );
};

export default AddNewShopDialog;
