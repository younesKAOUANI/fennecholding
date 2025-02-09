// components/MobileDataTable.jsx
import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Select from "react-select"; // Ensure react-select is installed

const MobileDataTable = ({
  data,
  tableData,
  search = true,
  searchLabel = "Rechercher...",
  Filter,
  ...props
}) => {
  // State for search and optional filters
  const [searchText, setSearchText] = useState("");
  const [juridicalFilter, setJuridicalFilter] = useState(null);
  const [classAffaireFilter, setClassAffaireFilter] = useState(null);

  // Memoized columns and data
  const columns = useMemo(
    () => (Array.isArray(tableData) ? tableData : []),
    [tableData]
  );
  const displayData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  // Optional filtering logic based on provided filters
  const filteredData = useMemo(() => {
    return displayData.filter((item) => {
      return (
        (!juridicalFilter ||
          item.etablissementJuridique === juridicalFilter.value) &&
        (!classAffaireFilter || item.classeAffaire === classAffaireFilter.value)
      );
    });
  }, [displayData, juridicalFilter, classAffaireFilter]);

  // Initialize the react-table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of rows, we'll use page for pagination
    prepareRow,
    state,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 8 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Update the table's global filter whenever searchText changes
  useEffect(() => {
    setGlobalFilter(searchText || "");
  }, [searchText, setGlobalFilter]);

  return (
    <div className="relative rounded-md">
      {/* Filters and Search */}
      <div className="p-4 pb-5 flex flex-wrap gap-4 bg-white rounded-md mb-4 shadow-md">
        {search && (
          <input
            type="text"
            className="block p-2 text-sm border border-gray-300 rounded-md w-full md:w-80 "
            placeholder={searchLabel}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        )}

        {Filter && Filter}
      </div>

      {/* Always display the mobile card layout */}
      <div className="grid grid-cols-3 gap-4">
        {page.map((row, rowIdx) => {
          prepareRow(row);
          return (
            <div
              className="bg-white rounded-lg shadow-md border border-gray-200"
              key={rowIdx}
            >
              {row.cells.map((cell, cellIdx) => (
                <div
                  key={cellIdx}
                  className="flex justify-between px-4 py-2 border-b last:border-none"
                >
                  <span className="font-medium text-gray-600">
                    {cell.column.Header}
                  </span>
                  <span className="text-gray-500">{cell.render("Cell")}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Optional Pagination Controls */}
      <div className="flex justify-between items-center p-4 bg-white rounded-md shadow-md  mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MobileDataTable;
