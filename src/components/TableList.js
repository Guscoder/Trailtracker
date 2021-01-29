import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import { connect } from "react-redux";
import * as actions from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import ViewButton from "./buttons/ViewButton";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import "./tablelist.scss";

function displayFormattedDate(date) {
  let newDate = date.split("-");
  let formattedDate = `${newDate[1]}/${newDate[2]}/${newDate[0].slice(2)}`;
  return formattedDate;
}

function renderListTitle(listStatus) {
  switch (listStatus) {
    case "completeditems":
      return "Completed Items";
    case "activeitems":
      return "Active Items";
    case "submitteditems":
      return "Submitted Items for Approval";
    default:
      return "Item List";
  }
}

function Table({ columns, data, listHeader }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows;

  return (
    <>
      <table
        className='table table-striped trailworklist-table-container'
        {...getTableProps()}
      >
        <thead className='trailworklist-table-head'>
          <tr className='table-title text-center'>
            <td colSpan='8'>
              <h1>{renderListTitle(listHeader)}</h1>
            </td>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr
              className='trailworklist-table-head'
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) =>
                column.hideHeader ? null : (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faCaretDown} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretUp} />
                        )
                      ) : column.hideSortCaret ? (
                        ""
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </span>
                  </th>
                )
              )}
            </tr>
          ))}
        </thead>
        <tbody className='table-hover' {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {/* <div>Showing the first 20 results of {rows.length} rows</div> */}
    </>
  );
}

function TableList(props) {
  useEffect(() => {
    const { listStatus } = props.match.params;
    props.fetchTrailItems(listStatus);
  }, []);

  const data = props.trailItems;
  console.log(data);
  const columns = React.useMemo(
    (listStatus) => [
      {
        Header: " ",
        hideHeader: true,
        columns: [
          {
            Header: "Date Found ",
            accessor: "date_found",
            sortMethod: (a, b) => Number(a) - Number(b),
            Cell: (cellInfo) => {
              return displayFormattedDate(cellInfo.row.original.date_found);
            },
          },
          {
            Header: "Reported By ",
            accessor: "reporting_person",
          },
          {
            Header: "Trailhead ",
            accessor: "trailhead_entrance",
          },
          {
            Header: "Mile Marker ",
            accessor: "mile_marker",
          },
          {
            Header: "Chapter ",
            accessor: "local_chapter",
          },
          {
            Header: "View",
            hideSortCaret: true,
            Cell: (cellInfo) => {
              return <ViewButton trailId={cellInfo.row.original.trailItemId} />;
            },
          },
          {
            Header: "Edit",
            hideSortCaret: true,
            Cell: (cellInfo) => {
              return (
                <EditButton
                  trailId={cellInfo.row.original.trailItemId}
                  itemStatus={cellInfo.row.original.trailItemStatus}
                />
              );
            },
          },
          {
            Header: "Delete",
            hideSortCaret: true,
            Cell: (cellInfo) => {
              return (
                <DeleteButton
                  trailId={cellInfo.row.original.trailItemId}
                  trailPhotoId={cellInfo.row.original.trailItemPhoto}
                  itemStatus={cellInfo.row.original.trailItemStatus}
                />
              );
            },
          },
        ],
      },
    ],
    []
  );

  if (!props.trailItems) return "Loading";

  return (
    <Table
      columns={columns}
      data={data}
      listHeader={props.match.params.listStatus}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(TableList);
