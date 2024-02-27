import Autocomplete from "@mui/material/Autocomplete";
import { productCategoriesLookup } from "../shared/shared.constants";
import TextField from "@mui/material/TextField";
import { FC } from "react";

interface ProductCategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductCategorySelect: FC<ProductCategorySelectProps> = ({ value, onChange }) => {
  return (
    <Autocomplete
      disableClearable
      options={Object.keys(productCategoriesLookup)}
      value={value}
      getOptionLabel={(option) => productCategoriesLookup[+option] ?? "Unknown category ID"}
      onChange={(_, value) => onChange(value)}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
};

export default ProductCategorySelect;
