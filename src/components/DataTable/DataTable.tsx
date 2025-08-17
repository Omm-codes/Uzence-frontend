import React, { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  darkMode?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  darkMode = false,
}: DataTableProps<T>): React.ReactElement {
  const [sortedData, setSortedData] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSortedData([...data]);
  }, [data]);

  useEffect(() => {
    if (onRowSelect) {
      onRowSelect(selectedRows);
    }
  }, [selectedRows, onRowSelect]);

  const handleSort = (key: keyof T, sortable?: boolean) => {
    if (!sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] === b[key]) return 0;
      
      if (direction === 'asc') {
        return a[key] < b[key] ? -1 : 1;
      } else {
        return a[key] > b[key] ? -1 : 1;
      }
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (row: T) => {
    if (!selectable) return;
    
    const isSelected = selectedRows.some(
      (selectedRow) => 
        row.id !== undefined && 
        selectedRow.id !== undefined && 
        selectedRow.id === row.id
    );
    
    if (isSelected) {
      setSelectedRows(selectedRows.filter(
        (selectedRow) => 
          row.id !== undefined && 
          selectedRow.id !== undefined && 
          selectedRow.id !== row.id
      ));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...sortedData]);
    }
    setSelectAll(!selectAll);
  };

  const isRowSelected = (row: T): boolean => {
    return selectedRows.some(
      (selectedRow) => 
        row.id !== undefined && 
        selectedRow.id !== undefined && 
        selectedRow.id === row.id
    );
  };

  // Tailwind classes based on dark mode
  const tableContainerClasses = `
    w-full overflow-x-auto rounded-lg
    ${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-md'}
  `;

  const tableClasses = `
    min-w-full divide-y
    ${darkMode ? 'divide-gray-700 text-gray-200' : 'divide-gray-200 text-gray-700'}
  `;

  const theadClasses = `
    ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}
  `;

  const thClasses = `
    px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
    ${darkMode ? 'text-gray-300' : 'text-gray-500'}
  `;

  const sortableThClasses = `
    cursor-pointer hover:bg-opacity-50
    ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}
  `;

  const tbodyClasses = `
    divide-y
    ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}
  `;

  const tdClasses = `
    px-6 py-4 whitespace-nowrap text-sm
    ${darkMode ? 'text-gray-200' : 'text-gray-500'}
  `;

  const trClasses = `
    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
  `;

  const selectedRowClasses = `
    ${darkMode ? 'bg-blue-900 bg-opacity-25' : 'bg-blue-50'}
  `;

  const loadingContainerClasses = `
    flex justify-center items-center min-h-[200px] w-full
    ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'}
  `;

  const emptyStateClasses = `
    flex justify-center items-center min-h-[200px] w-full
    ${darkMode 
      ? 'bg-gray-800 text-gray-400 border border-gray-700' 
      : 'bg-gray-50 text-gray-400 border border-gray-200'
    }
    border-dashed rounded-lg
  `;

  if (loading) {
    return (
      <div className={loadingContainerClasses} aria-busy="true" aria-live="polite">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!sortedData.length) {
    return (
      <div className={emptyStateClasses} aria-live="polite">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className={tableContainerClasses}>
      <table className={tableClasses} role="grid">
        <thead className={theadClasses}>
          <tr>
            {selectable && (
              <th className={thClasses} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column.dataIndex, column.sortable)}
                className={`${thClasses} ${column.sortable ? sortableThClasses : ''}`}
                aria-sort={
                  sortConfig && sortConfig.key === column.dataIndex
                    ? sortConfig.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                }
              >
                <div className="flex items-center space-x-1">
                  <span>{column.title}</span>
                  {column.sortable && (
                    <span className="text-gray-400">
                      {sortConfig && sortConfig.key === column.dataIndex ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )
                      ) : (
                        <div className="flex flex-col h-4">
                          <ChevronUpIcon className="h-2 w-2" />
                          <ChevronDownIcon className="h-2 w-2" />
                        </div>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={tbodyClasses}>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id?.toString() || rowIndex}
              onClick={() => handleRowSelect(row)}
              className={`${trClasses} ${isRowSelected(row) ? selectedRowClasses : ''}`}
              aria-selected={isRowSelected(row)}
            >
              {selectable && (
                <td className={tdClasses} style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    checked={isRowSelected(row)}
                    onChange={() => handleRowSelect(row)}
                    aria-label={`Select row ${rowIndex + 1}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} className={tdClasses}>
                  {String(row[column.dataIndex] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
