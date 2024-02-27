import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LoadingButton from "../shared/LoadingButton";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../store/categories/categories.api.slice";
import toast from "react-hot-toast";
import { Category } from "../../store/categories/categories.types";

interface CategoryFormType {
  name: string;
}

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: Category;
}

const CategoryDialog: FC<CategoryDialogProps> = ({ initialValues, isOpen, onClose, onSuccess }) => {
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm<CategoryFormType>();

  useEffect(() => {
    if (isOpen) {
      reset({ name: initialValues?.name ?? "" });
    }
  }, [initialValues, isOpen, reset]);

  const [createCategory, { isLoading: createCategoryLoading }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updateCategoryLoading }] = useUpdateCategoryMutation();

  const isAddAction = !initialValues;
  const title = useMemo(() => (isAddAction ? "Add New Category" : "Edit Category"), [isAddAction]);

  const onSubmit = useCallback<SubmitHandler<CategoryFormType>>(
    async (formValues) => {
      if (isAddAction) {
        if (confirm("Are you sure you want to add new Category?")) {
          try {
            await createCategory({ body: { name: formValues.name } });

            toast.success("Successful!");

            onSuccess();
          } catch (e) {
            console.error(e);
            toast.error("Something went wrong.");
          }
        }
      } else {
        if (confirm("Are you sure you want to update this Category?")) {
          try {
            await updateCategory({ body: { name: formValues.name }, id: initialValues.id });

            toast.success("Successful!");

            onSuccess();
          } catch (e) {
            console.error(e);
            toast.error("Something went wrong.");
          }
        }
      }
    },
    [isAddAction, initialValues, createCategory, onSuccess, updateCategory],
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Grid noValidate component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
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
            disabled={!isDirty || createCategoryLoading || updateCategoryLoading}
            isLoading={createCategoryLoading || updateCategoryLoading}
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

export default CategoryDialog;
