import { FC } from "react";
import { ShopSale } from "../../store/shops/shops.types";
import Table from "../shared/Table";
import { TableHeaderColumn } from "../shared/Table.types";
import ShopSalesTableRow from "./ShopSalesTableRow";
import Paper from "@mui/material/Paper";

const headerColumns: TableHeaderColumn[] = [
  { id: "", label: "", clickDisabled: true },
  { id: "uid", label: "Date & Time", clickDisabled: true },
  { id: "payment", label: "Type of Payment", clickDisabled: true },
  { id: "discountAmount", label: "Amount of Discount", clickDisabled: true },
];

const renderRow = (sale: ShopSale, index: number) => {
  return <ShopSalesTableRow key={index} sale={sale} />;
};

interface ShopSalesTableProps {
  sales: ShopSale[];
}

const ShopSalesTable: FC<ShopSalesTableProps> = ({ sales }) => {
  return (
    <Paper elevation={3} sx={{ width: 1000 }}>
      <Table<ShopSale> data={sales} header={{ columns: headerColumns }} renderRow={renderRow} />
    </Paper>
  );
};

export default ShopSalesTable;
