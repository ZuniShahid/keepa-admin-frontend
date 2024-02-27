export interface TableHeaderColumn {
  id: string;
  label: string;
  clickDisabled?: boolean;
}

export type TableSortingDirection = "asc" | "desc" | undefined;
