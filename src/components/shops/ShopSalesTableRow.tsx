import { FC, useMemo, useState } from "react";
import { ShopSale } from "../../store/shops/shops.types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import format from "date-fns/format";
import Collapse from "@mui/material/Collapse";
import ShopSaleProductsTable from "./ShopSaleProductsTable";

interface ShopSalesTableRowProps {
  sale: ShopSale;
}

const ShopSalesTableRow: FC<ShopSalesTableRowProps> = ({ sale }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { discountAmount, payment, products, uid } = sale;

  const arrowIcon = useMemo(() => {
    if (isExpanded) {
      return <KeyboardArrowUpIcon />;
    }

    return <KeyboardArrowDownIcon />;
  }, [isExpanded]);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setIsExpanded((currentValue) => !currentValue)}>
            {arrowIcon}
          </IconButton>
        </TableCell>
        <TableCell>{format(new Date(uid), "dd.MM.yyyy HH:mm:ss")}</TableCell>
        <TableCell>{payment}</TableCell>
        <TableCell>{discountAmount}</TableCell>
      </TableRow>
      <TableRow sx={{ backgroundColor: "rgb(230, 230, 230)" }}>
        <TableCell colSpan={4} sx={{ borderBottom: 0, pb: 0, pt: 0 }}>
          <Collapse unmountOnExit in={isExpanded} timeout="auto">
            <ShopSaleProductsTable products={products} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ShopSalesTableRow;
