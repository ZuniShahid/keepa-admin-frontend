import TableRow from "@mui/material/TableRow";
import Table from "../shared/Table";
import TableCell from "@mui/material/TableCell";
import { FC } from "react";
import { TableHeaderColumn } from "../shared/Table.types";
import { getProductImageUrl } from "../shared/shared.utils";
import { ShopSaleProduct } from "../../store/shops/shops.types";

const headerColumns: TableHeaderColumn[] = [
  { id: "name", label: "Name", clickDisabled: true },
  { id: "", label: "Image", clickDisabled: true },
  { id: "barcode", label: "Barcode", clickDisabled: true },
  { id: "amount", label: "Amount", clickDisabled: true },
  { id: "prizeSell", label: "Prize Sell", clickDisabled: true },
];

const renderRow = ({ amount, barcode, imgId, name, prizeSell }: ShopSaleProduct, index: number) => {
  return (
    <TableRow key={index}>
      <TableCell>{name}</TableCell>
      <TableCell>
        <img alt={name} loading="lazy" src={getProductImageUrl(imgId)} width={60} />
      </TableCell>
      <TableCell>{barcode}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{prizeSell}</TableCell>
    </TableRow>
  );
};

interface ShopSaleProductsTableProps {
  products: ShopSaleProduct[];
}

const ShopSaleProductsTable: FC<ShopSaleProductsTableProps> = ({ products }) => {
  return (
    <Table<ShopSaleProduct>
      data={products}
      header={{ columns: headerColumns }}
      renderRow={renderRow}
    />
  );
};

export default ShopSaleProductsTable;
