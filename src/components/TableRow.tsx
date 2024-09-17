import React from "react";
import { Artwork } from "../hooks/useArtworkData.ts";

interface TableRowProps {
  item: Artwork;
  index: number;
  currentPage: number;
  indexOfFirstRow: number;
  selectedRows: number[];
  setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
}

const TableRow: React.FC<TableRowProps> = ({
  item,
  index,
  currentPage,
  indexOfFirstRow,
  selectedRows,
  setSelectedRows,
}) => {
  const globalIndex = indexOfFirstRow + index;

  const isRowSelected = (index: number) => {
    return selectedRows.includes(index);
  };

  return (
    <tr key={index}>
      <td>
        <input
          className={`page-${currentPage}-checkbox`}
          type="checkbox"
          checked={isRowSelected(globalIndex)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows((prevSelected) => [
                ...prevSelected,
                globalIndex,
              ]);
            } else {
              setSelectedRows((prevSelected) =>
                prevSelected.filter((id) => id !== globalIndex)
              );
            }
          }}
        />
        {item.title}
      </td>
      <td>{item.place_of_origin}</td>
      <td>{item.artist_display}</td>
      <td>{item.inscriptions}</td>
      <td>{item.date_start}</td>
      <td>{item.date_end}</td>
    </tr>
  );
};

export default TableRow;
