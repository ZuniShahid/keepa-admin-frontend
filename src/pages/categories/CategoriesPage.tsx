import { useCallback, useMemo, useState } from "react";
import AddNewCategoryButton from "../../components/categories/AddNewCategoryButton";
import CategoriesList from "../../components/categories/CategoriesList";
import PageTitle from "../../components/shared/PageTitle";
import { useGetCategoriesQuery } from "../../store/categories/categories.api.slice";
import CircularProgress from "@mui/material/CircularProgress";
import sortBy from "lodash/sortBy";
import Toast from "../../components/shared/Toast";
import CategoryDialog from "../../components/categories/CategoryDialog";
import { Category } from "../../store/categories/categories.types";

const CategoriesPageRender = () => {
  const [dialogInitialValues, setDialogInitialValues] = useState<Category | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useGetCategoriesQuery();

  const closeDialog = useCallback(() => setIsDialogOpen(false), []);
  const openDialog = useCallback(() => setIsDialogOpen(true), []);

  const onAddClick = useCallback(() => {
    setDialogInitialValues(undefined);
    openDialog();
  }, [openDialog]);

  const onEditClick = useCallback<(category: Category) => void>(
    (category) => {
      setDialogInitialValues(category);
      openDialog();
    },
    [openDialog],
  );

  const onMutationSuccess = useCallback(() => setTimeout(refetch, 3000), [refetch]);

  const onSuccess = useCallback(() => {
    closeDialog();
    onMutationSuccess();
  }, [closeDialog, onMutationSuccess]);

  const content = useMemo(() => {
    if (isLoading || !data) {
      return <CircularProgress />;
    }

    return (
      <>
        <AddNewCategoryButton onClick={onAddClick} />
        <CategoriesList
          data={sortBy(data, "name")}
          onDeleteSuccess={onMutationSuccess}
          onEditClick={onEditClick}
        />
        <Toast />
      </>
    );
  }, [data, isLoading, onAddClick, onEditClick, onMutationSuccess]);

  return (
    <>
      <PageTitle title="Categories" />
      {content}
      <CategoryDialog
        initialValues={dialogInitialValues}
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default CategoriesPageRender;
