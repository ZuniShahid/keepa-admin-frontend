import { SxProps, Theme } from "@mui/material/styles";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useCallback, useMemo, useRef } from "react";
import TableSortLabel from "@mui/material/TableSortLabel";
import { TableHeaderColumn, TableSortingDirection } from "./Table.types";
import TablePagination from "@mui/material/TablePagination";
import TableContainer from "@mui/material/TableContainer";

interface PaginationProperties {
  count: number;
  currentPage: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

interface TableProps<T> {
  data: Array<T>;
  header: {
    columns: TableHeaderColumn[];
    columnStyle?: SxProps<Theme>;
  };
  renderRow: (item: T, index: number) => JSX.Element;
  maxHeight?: number;
  paginationProperties?: PaginationProperties;
  sortingDirection?: TableSortingDirection;
  sortingId?: string;
  sortingEnabled?: boolean;
  stickyHeader?: boolean;
  onHeaderColumnClick?: (id: string) => void;
}

const Table = <T extends unknown>({
  data,
  header,
  maxHeight,
  paginationProperties,
  sortingDirection,
  sortingId,
  sortingEnabled = false,
  stickyHeader = false,
  onHeaderColumnClick,
  renderRow,
}: TableProps<T>) => {
  const ref = useRef<HTMLTableElement | null>(null);

  const isDataEmpty = data.length === 0;

  const tableBody = useMemo(() => {
    if (isDataEmpty) {
      return (
        <TableRow sx={{ verticalAlign: "middle" }}>
          <TableCell align="center" colSpan={header.columns.length}>
            No data
          </TableCell>
        </TableRow>
      );
    }

    return <>{data.map(renderRow)}</>;
  }, [data, header.columns, isDataEmpty, renderRow]);

  const onPageChange = useCallback<(page: number) => void>(
    (page) => {
      paginationProperties?.onPageChange(page);
      ref.current?.scrollTo({ top: 0 });
    },
    [paginationProperties],
  );

  const renderTableCellLabel = useCallback<(headerColumn: TableHeaderColumn) => JSX.Element>(
    ({ clickDisabled, id, label }) => {
      if (!clickDisabled && sortingEnabled) {
        return (
          <TableSortLabel
            active={sortingId === id}
            direction={sortingDirection}
            onClick={() => onHeaderColumnClick && onHeaderColumnClick(id)}
          >
            {label}
          </TableSortLabel>
        );
      }

      return <>{label}</>;
    },
    [sortingDirection, sortingId, sortingEnabled, onHeaderColumnClick],
  );

  return (
    <>
      <TableContainer ref={ref} sx={{ maxHeight }}>
        <MuiTable stickyHeader={stickyHeader} sx={{ height: isDataEmpty ? 1 : "auto" }}>
          <TableHead>
            <TableRow>
              {header.columns.map((item, index) => (
                <TableCell key={index} sx={header.columnStyle}>
                  {renderTableCellLabel(item)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </MuiTable>
      </TableContainer>
      {paginationProperties && (
        <TablePagination
          showFirstButton
          showLastButton
          component="div"
          count={paginationProperties.count}
          page={paginationProperties.currentPage}
          rowsPerPage={paginationProperties.rowsPerPage}
          rowsPerPageOptions={[paginationProperties.rowsPerPage]}
          onPageChange={(_, page) => onPageChange(page)}
        />
      )}
    </>
  );
};

export default Table;
