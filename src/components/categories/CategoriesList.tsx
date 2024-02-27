import { FC, Fragment, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Category } from "../../store/categories/categories.types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useDeleteCategoryMutation } from "../../store/categories/categories.api.slice";
import toast from "react-hot-toast";

interface CategoriesListProps {
  data: Category[];
  onDeleteSuccess: () => void;
  onEditClick: (category: Category) => void;
}

const CategoriesList: FC<CategoriesListProps> = ({ data, onDeleteSuccess, onEditClick }) => {
  const [deleteCategory] = useDeleteCategoryMutation();

  const onDelete = useCallback<(category: Category) => Promise<void>>(
    async ({ id, name }) => {
      if (confirm(`Are you sure you want to delete Category "${name}"?`)) {
        try {
          await deleteCategory({ id });

          toast.success("Successful!");

          onDeleteSuccess();
        } catch (e) {
          console.error(e);
          toast.error("Something went wrong.");
        }
      }
    },
    [deleteCategory, onDeleteSuccess],
  );

  return (
    <List disablePadding sx={{ bgcolor: "background.paper" }}>
      {data.map((category, index) => (
        <Fragment key={index}>
          <ListItem
            secondaryAction={
              <>
                <IconButton onClick={() => onEditClick(category)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(category)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={category.name} secondary={category.id} />
          </ListItem>
          {index < data.length - 1 && <Divider component="li" />}
        </Fragment>
      ))}
    </List>
  );
};

export default CategoriesList;
