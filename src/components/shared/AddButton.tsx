import AddIcon from "@mui/icons-material/Add";
import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";

const AddButton: FC<ButtonProps> = (props) => {
  return <Button {...props} startIcon={<AddIcon />} />;
};

export default AddButton;
