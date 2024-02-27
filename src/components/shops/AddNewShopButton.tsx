import Grid from "@mui/material/Grid";
import AddButton from "../shared/AddButton";
import { FC } from "react";

interface AddNewShopButtonProps {
  onClick: () => void;
}

const AddNewShopButton: FC<AddNewShopButtonProps> = ({ onClick }) => {
  return (
    <Grid container justifyContent="flex-end" mb={4}>
      <AddButton variant="contained" onClick={onClick}>
        Add New Shop
      </AddButton>
    </Grid>
  );
};

export default AddNewShopButton;
