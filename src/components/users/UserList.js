import React, { useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import EditUserButton from '../buttons/EditUserButton';
import DeleteUserButton from '../buttons/DeleteUserButton';
import '../tablelist.scss';

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
          <tr className='text-center userlist-header'>
            <td colSpan='5'>
              <h1>User List</h1>
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
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={faCaretDown} />
                        ) : (
                          <FontAwesomeIcon icon={faCaretUp} />
                        )
                      ) : column.hideSortCaret ? (
                        ''
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
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

function UserList(props) {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  const userListData = props.userList;

  console.log(userListData);

  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        hideHeader: true,
        columns: [
          {
            Header: 'Name ',
            accessor: 'username',
          },
          {
            Header: 'Email ',
            accessor: 'email',
          },
          {
            Header: 'Role ',
            accessor: 'role',
          },
          // {
          //   Header: 'Edit',
          //   hideSortCaret: true,
          //   Cell: (cellInfo) => {
          //     return (
          //       <EditUserButton
          //         userEmail={cellInfo.row.original.email}
          //         username={cellInfo.row.original.username}
          //       />
          //     );
          //   },
          // },
          {
            Header: 'Delete',
            hideSortCaret: true,
            Cell: (cellInfo) => {
              return (
                <DeleteUserButton
                  userEmail={cellInfo.row.original.email}
                  userName={cellInfo.row.original.username}
                />
              );
            },
          },
        ],
      },
    ],
    []
  );

  if (!props.userList) return 'Loading';

  return <Table columns={columns} data={userListData} />;
}

const mapStateToProps = (state) => {
  return {
    userList: state.fetchUsers.userList,
  };
};

export default connect(mapStateToProps, actions)(UserList);
