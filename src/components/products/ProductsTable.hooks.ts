import { useCallback, useMemo, useState } from "react";
import { TableSortingDirection } from "../shared/Table.types";
import { Item } from "../../store/items/items.types";
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import lowerCase from "lodash/lowerCase";
import sortBy from "lodash/sortBy";
import trim from "lodash/trim";

const sanitizeString = (value: string) => lowerCase(trim(value));

const rowsPerPage = 50;

export const useTableData = (
  data: Item[],
  searchString: string,
  sortingDirection: TableSortingDirection,
  sortingId: string | undefined,
) => {
  const [currentPage, setCurrentPage] = useState(0);

  return useMemo(() => {
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    let filteredData = [...data];

    const sanitizedSearchString = sanitizeString(searchString);
    if (!isEmpty(sanitizedSearchString)) {
      filteredData = filter(filteredData, ({ name }) =>
        sanitizeString(name).includes(sanitizedSearchString),
      );
    }

    if (sortingDirection && sortingId) {
      if (sortingDirection === "asc") {
        filteredData = sortBy(filteredData, sortingId);
      } else {
        filteredData = sortBy(filteredData, sortingId).reverse();
      }
    }

    const slicedData = filteredData.slice(currentPage * rowsPerPage, endIndex);

    return {
      count: filteredData.length,
      currentPage,
      data: slicedData,
      rowsPerPage,
      setCurrentPage,
    };
  }, [currentPage, data, searchString, sortingDirection, sortingId]);
};

interface SortAttributes {
  direction: TableSortingDirection;
  id: string | undefined;
}

export const useTableSorting = () => {
  const [sortingAttributes, setSortingAttributes] = useState<SortAttributes>({
    direction: undefined,
    id: undefined,
  });

  const onChange = useCallback<(id: string) => void>(
    (id) =>
      setSortingAttributes((currentValue) => {
        if (currentValue.id === id) {
          if (currentValue.direction === "asc") {
            return {
              ...currentValue,
              direction: "desc",
            };
          }

          return {
            ...currentValue,
            direction: "asc",
          };
        }

        return {
          direction: "asc",
          id,
        };
      }),
    [],
  );

  return {
    sortingDirection: sortingAttributes?.direction,
    sortingId: sortingAttributes?.id,
    onChange,
  };
};
