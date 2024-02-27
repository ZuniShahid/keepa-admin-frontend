import TableRow from "@mui/material/TableRow";
import { Item } from "../../store/items/items.types";
import Table from "../shared/Table";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTableData, useTableSorting } from "./ProductsTable.hooks";
import { FC, useCallback, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { TableHeaderColumn } from "../shared/Table.types";
import { Link } from "react-router-dom";
import ProductPage from "../../pages/products/[id]";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../shared/shared.hooks";
import IconButton from "@mui/material/IconButton";
import { getProductImageUrl } from "../shared/shared.utils";

const headerColumns: TableHeaderColumn[] = [
  { id: "name", label: "Name" },
  { id: "", label: "Image", clickDisabled: true },
  { id: "barcode", label: "Barcode" },
  { id: "amount", label: "Amount" },
  { id: "prizeBuy", label: "Prize Buy" },
  { id: "prizeSell", label: "Prize Sell" },
  { id: "", label: "", clickDisabled: true },
];

const renderRow = (
  { amount, barcode, id, imgId, name, prizeBuy, prizeSell }: Item,
  index: number,
) => {
  return (
    <TableRow key={index}>
      <TableCell>
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell>
        <img alt={name} loading="lazy" src={getProductImageUrl(imgId)} width={100} />
      </TableCell>
      <TableCell>
        <Typography>{barcode}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{amount}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{prizeBuy}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{prizeSell}</Typography>
      </TableCell>
      <TableCell>
        <Link to={ProductPage.path(id)}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
};

interface ProductsTableProps {
  data: Item[];
  maxHeight?: number;
}

const ProductsTable: FC<ProductsTableProps> = ({ data, maxHeight }) => {
  const [searchString, setSearchString] = useState("");

  const debouncedSearchString = useDebounce(searchString, 300);

  const { sortingDirection, sortingId, onChange } = useTableSorting();

  const {
    count,
    currentPage,
    data: tableData,
    rowsPerPage,
    setCurrentPage,
  } = useTableData(data, debouncedSearchString, sortingDirection, sortingId);

  const onHeaderColumnClick = useCallback<(id: string) => void>(
    (id) => {
      onChange(id);
      setCurrentPage(0);
    },
    [onChange, setCurrentPage],
  );

  return (
    <Paper elevation={5}>
      <Grid container alignItems="center" justifyContent="center" pb={1} pt={3}>
        <TextField
          placeholder="Search by name"
          variant="standard"
          value={searchString}
          sx={{ width: 400, "input::placeholder": { fontStyle: "italic" } }}
          onChange={(event) => setSearchString(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Table<Item>
        sortingEnabled
        stickyHeader
        data={tableData}
        header={{ columns: headerColumns }}
        maxHeight={maxHeight}
        paginationProperties={{
          count,
          currentPage,
          rowsPerPage,
          onPageChange: setCurrentPage,
        }}
        sortingDirection={sortingDirection}
        sortingId={sortingId}
        onHeaderColumnClick={onHeaderColumnClick}
        renderRow={renderRow}
      />
    </Paper>
  );
};

export default ProductsTable;
