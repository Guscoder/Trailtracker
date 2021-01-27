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

function Table({ columns, data }) {
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
            <td colSpan='9'>
              <h1>Completed Items</h1>
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
    props.fetchTrailItems("completeditems");
  }, []);

  const data = props.trailItems;
  console.log(data);
  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        hideHeader: true,
        columns: [
          {
            Header: "Date Found ",
            accessor: "date_found",
            sortMethod: (a, b) => Number(a) - Number(b),
          },
          {
            Header: "Completed ",
            accessor: "date_resolved",
            sortMethod: (a, b) => Number(a) - Number(b),
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
      //   listHeader={props.match.params.listStatus}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(TableList);
