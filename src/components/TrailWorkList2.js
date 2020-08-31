import React from 'react';
import TrailworkListItem from './TrailworkListItem';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './trailworklist.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useTable, useSortBy } from 'react-table';

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
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
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
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

class TrailworkList extends React.Component {
  componentDidMount() {
    console.log(this.props);
    const { listStatus } = this.props.match.params;
    console.log(listStatus);
    this.props.fetchTrailItems(listStatus);
    console.log('I mounted');
  }

  renderListTitle = () => {
    const { listStatus } = this.props.match.params;

    console.log('title: ' + listStatus);
    switch (listStatus) {
      case 'completeditems':
        return 'Completed Items';
      case 'activeitems':
        return 'Active Items';
      case 'submitteditems':
        return 'Submitted Items for Approval';
      default:
        return 'Item List';
    }
  };

  //   renderTrailList = () => {
  //     if (this.props.trailItems) {
  //       return this.props.trailItems.map((trailItem) => {
  //         return <TrailworkListItem trailItem={trailItem} key={trailItem.key} />;
  //       });
  //     } else {
  //       return (
  //         <tr>
  //           <td>Loading</td>
  //         </tr>
  //       );
  //     }

  //   };

  render() {
    const data = this.props.trailItems;
    const columns = {
      Header: 'Submitted Items for Approval',
      columns: [
        {
          Header: 'Date Found',
          accessor: 'date_found',
        },
        {
          Header: 'Reported By',
          accessor: 'reporting_person',
        },
        {
          Header: 'Trailhead',
          accessor: 'trailhead_entrance',
        },
        {
          Header: 'Chapter',
          accessor: 'local_chapter',
        },
        {
          Header: 'View',
          accessor: 'view',
        },
        {
          Header: 'Edit',
          accessor: 'edit',
        },
        {
          Header: 'Delete',
          accessor: 'delete',
        },
      ],
    };

    return (
      <main className='trailworklist-table-container'>
        <Table columns={columns} data={data} />;
        {/* <table className='table table-striped'>
          <thead className='trailworklist-table-head'>
            <tr>
              <th colspan='7' className='text-center'>
                <h1>{this.renderListTitle()}</h1>
              </th>
            </tr>
            <tr>
              <th scope='col'>
                Date Found <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>
                Reported By <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>
                Trailhead <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col' onClick={this.sortTrailList}>
                Chapter <FontAwesomeIcon icon={faCaretDown} />
              </th>
              <th scope='col'>View</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody className='table-hover' id='main-data-table'>
            {this.renderTrailList()}
          </tbody>
        </table> */}
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trailItems: state.trailData.trailItems,
  };
};

export default connect(mapStateToProps, actions)(TrailworkList);
