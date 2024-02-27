import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FC, useCallback } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ProductFormType } from "./ProductForm.types";
import ProductCategorySelect from "./ProductCategorySelect";
import { usePutItemMutation } from "../../store/items/items.api.slice";
import LoadingButton from "../shared/LoadingButton";
import toast from "react-hot-toast";
import Toast from "../shared/Toast";
import { PutItemBody } from "../../store/items/items.types";

interface ProductFormProps {
  barcode: string;
  itemId: string;
  defaultValues: ProductFormType | undefined;
}

const ProductForm: FC<ProductFormProps> = ({ barcode, itemId, defaultValues }) => {
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ProductFormType>({ defaultValues });

  const [putItem, { isLoading }] = usePutItemMutation();

  const onSubmit = useCallback<SubmitHandler<ProductFormType>>(
    async (formValues) => {
      if (confirm("Are you sure you want to update this item?")) {
        try {
          const body: PutItemBody = {
            ...formValues,
            amount: +formValues.amount,
            prizeBuy: +formValues.prizeBuy,
            prizeSell: +formValues.prizeSell,
          };

          const putItemResponse = await putItem({ body, itemId }).unwrap();

          toast.success("Successful!");

          reset({
            amount: putItemResponse.amount.toString(),
            categoryIdx: putItemResponse.categoryIdx,
            name: putItemResponse.name,
            prizeBuy: putItemResponse.prizeBuy.toString(),
            prizeSell: putItemResponse.prizeSell.toString(),
          });
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong.");
        }
      }
    },
    [itemId, putItem, reset],
  );

  return (
    <Grid container noValidate component="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <Grid item xs={12}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} fullWidth required label="Name" />}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField disabled fullWidth label="Barcode" value={barcode} />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="categoryIdx"
          control={control}
          render={({ field }) => (
            <ProductCategorySelect
              value={field.value.toString()}
              onChange={(value) => setValue("categoryIdx", +value)}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth required label="Amount" type="number" />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="prizeBuy"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth required label="Prize Buy" type="number" />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="prizeSell"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth required label="Prize Sell" type="number" />
          )}
        />
      </Grid>
      <Grid container item justifyContent="flex-end" xs={12}>
        <LoadingButton
          disabled={!isDirty || isLoading}
          isLoading={isLoading}
          color="secondary"
          type="submit"
          variant="contained"
          sx={{ width: 70 }}
        >
          Save
        </LoadingButton>
      </Grid>
      <Toast />
    </Grid>
  );
};

export default ProductForm;
