import Grid from "@mui/material/Grid";
import AddButton from "../shared/AddButton";
import { FC } from "react";

interface AddNewCategoryButtonProps {
  onClick: () => void;
}

const AddNewCategoryButton: FC<AddNewCategoryButtonProps> = ({ onClick }) => {
  return (
    <Grid container justifyContent="flex-end" mb={4}>
      <AddButton variant="contained" onClick={onClick}>
        Add New Category
      </AddButton>
    </Grid>
  );
};

export default AddNewCategoryButton;
