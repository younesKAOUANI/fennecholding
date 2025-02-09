import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Select from "react-select"; // Install react-select if not already

const DataTable = ({
  data,
  tableData,
  search = true,
  searchLabel = "Rechercher...",
  caseFilter = false,
}) => {
  const [searchText, setSearchText] = useState("");
  const [juridicalFilter, setJuridicalFilter] = useState(null);
  const [classAffaireFilter, setClassAffaireFilter] = useState(null);

  const columns = useMemo(
    () => (Array.isArray(tableData) ? tableData : []),
    [tableData]
  );
  const displayData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const filteredData = useMemo(() => {
    return displayData.filter((item) => {
      return (
        (!juridicalFilter ||
          item.etablissementJuridique === juridicalFilter.value) &&
        (!classAffaireFilter || item.classeAffaire === classAffaireFilter.value)
      );
    });
  }, [displayData, juridicalFilter, classAffaireFilter]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
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

  useEffect(() => {
    setGlobalFilter(searchText || "");
  }, [searchText, setGlobalFilter]);

  return (
<div className="relative shadow-md rounded-md">
  {/* Filters and Search */}
  <div className="p-4 pb-5 flex flex-wrap gap-4 bg-white">
    {search && (
      <input
        type="text"
        className="block p-2 text-sm border border-gray-300 rounded-md w-full md:w-80 bg-gray-50"
        placeholder={searchLabel}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    )}

    {/* {caseFilter && (
      <div className="flex flex-col gap-4 md:flex-row w-full md:w-1/2">
        <Select
          options={juridicalAuthorities}
          onChange={setJuridicalFilter}
          placeholder="الجهة القضائية"
          isClearable
          className="w-full"
        />
        <Select
          options={juridicalChambers}
          onChange={setClassAffaireFilter}
          placeholder="القسم/الغرفة"
          isClearable
          className="w-full"
        />
      </div>
    )} */}
  </div>

  {/* Table for Large Screens */}
  <table
    {...getTableProps()}
    className="hidden sm:table w-full text-sm text-right text-black"
  >
    <thead className="text-xs uppercase bg-gray-50 text-gray-400 border-b-2 border-gray-300">
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className="px-4 py-3 text-right"
              key={column.id}
            >
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            key={row.id}
            className="bg-white border-b hover:bg-gray-100"
          >
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()} className="px-4 py-2">
                {cell.render("Cell")}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>

  {/* Card Layout for Small Screens */}
  <div className="sm:hidden">
    {page.map((row, rowIdx) => {
      prepareRow(row);
      return (
        <div
          className="mx-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200"
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
              <span className="text-gray-800">{cell.render("Cell")}</span>
            </div>
          ))}
        </div>
      );
    })}
  </div>
</div>
  );
};

export default DataTable;
