import React, { useState } from "react";
import "../App.css";
import useArtworkData from "../hooks/useArtworkData.ts";
import Pagination from "./Pagination.tsx";
import TableRow from "./TableRow.tsx";

const Table: React.FC = () => {
  const { data, loading } = useArtworkData(); // Custom hook for fetching artwork data
  const [checked, setChecked] = useState<boolean>(false); // For "Select All"
  const [numRows, setNumRows] = useState<number>(0);
  const [down, setDown] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5; // Show 5 rows per page
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // Track selected rows

  const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumRows(Number(e.target.value) || 0); // Fallback to 0 if input is empty
  };

  const changeButton = () => {
    setDown(!down);
  };

  const changeCheckbox = () => {
    setChecked((prevChecked) => {
      const nextChecked = !prevChecked;
      if (nextChecked) {
        selectAllRows(); // Select all rows
      } else {
        clearAllRows(); // Uncheck all rows
      }
      return nextChecked;
    });
  };

  const selectAllRows = () => {
    const allRowIds = data.map((_, index) => index);
    setSelectedRows(allRowIds);
  };

  const clearAllRows = () => {
    setSelectedRows([]);
  };

  const handleSubmit = () => {
    selectRowsAcrossPages(numRows);
  };

  const selectRowsAcrossPages = (num: number) => {
    const totalRows = data.length;
    let remainingRows = num;
    let page = currentPage;

    const newSelectedRows = [...selectedRows];

    while (remainingRows > 0 && page <= Math.ceil(totalRows / rowsPerPage)) {
      const startIdx = (page - 1) * rowsPerPage;
      const endIdx = Math.min(startIdx + rowsPerPage, totalRows);

      for (let i = startIdx; i < endIdx && remainingRows > 0; i++) {
        if (!newSelectedRows.includes(i)) {
          newSelectedRows.push(i);
          remainingRows--;
        }
      }

      if (remainingRows > 0) {
        page++;
      }
    }

    setSelectedRows(newSelectedRows);
    setCurrentPage(page);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="table-header-controls">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={changeCheckbox}
                />
                <button onClick={changeButton} style={{ display: "inline" }}>
                  <i style={{ marginLeft: "5px" }} className={down ? "rotate" : ""}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
                    </svg>
                  </i>
                </button>
                {down && (
                  <form className="box">
                    <label htmlFor="number" style={{ marginRight: "5px" }}>
                      Enter rows:
                    </label>
                    <input
                      type="number"
                      id="number"
                      onChange={changeChecked}
                      style={{ width: "60px" }} /* Small input box */
                    />
                    <button type="button" onClick={handleSubmit} style={{ marginLeft: "5px" }}>
                      Submit
                    </button>
                  </form>
                )}
              </div>
              Title
            </th>
            <th>Place of Origin</th>
            <th>Artist Display</th>
            <th>Inscriptions</th>
            <th>Date Start</th>
            <th>Date End</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            currentRows.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                index={index}
                currentPage={currentPage}
                indexOfFirstRow={indexOfFirstRow}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
              />
            ))
          )}
        </tbody>
      </table>

      <Pagination
        dataLength={data.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default Table;
