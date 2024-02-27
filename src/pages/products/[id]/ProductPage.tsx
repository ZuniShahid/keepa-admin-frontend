import { useParams } from "react-router-dom";
import { useGetItemQuery } from "../../../store/items/items.api.slice";
import PageTitle from "../../../components/shared/PageTitle";
import ProductForm from "../../../components/products/ProductForm";
import { useMemo } from "react";
import { ProductFormType } from "../../../components/products/ProductForm.types";
import CircularProgress from "@mui/material/CircularProgress";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetItemQuery(id as string, { skip: !id });

  const productFormDefaultValues = useMemo<ProductFormType | undefined>(() => {
    if (!data) {
      return undefined;
    }

    return {
      amount: data.amount.toString(),
      categoryIdx: data.categoryIdx,
      name: data.name,
      prizeBuy: data.prizeBuy.toString(),
      prizeSell: data.prizeSell.toString(),
    };
  }, [data]);

  const productFormContent = useMemo(() => {
    if (!data || isLoading) {
      return <CircularProgress />;
    }

    return (
      <ProductForm
        barcode={data.barcode}
        defaultValues={productFormDefaultValues}
        itemId={id as string}
      />
    );
  }, [data, id, isLoading, productFormDefaultValues]);

  return (
    <>
      <PageTitle title="Edit Product" />
      {productFormContent}
    </>
  );
};

export default ProductPage;
