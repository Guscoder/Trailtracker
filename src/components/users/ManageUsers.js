import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import UserProfile from './UserProfile';

class ManageUsers extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchUsers();
    console.log('I got users');
  }

  renderUserList = () => {
    console.log(this.props.userList);
    if (this.props.userList) {
      console.log('list is here');
      return this.props.userList.map((user) => {
        return <UserProfile user={user} key={user.email} />;
      });
    } else {
      return (
        <tr>
          <td>Loading</td>
        </tr>
      );
    }
  };

  render() {
    return (
      <main className='userlist-table-container'>
        <table className='table table-striped'>
          <thead className='userlist-table-head'>
            <tr>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Role</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          <tbody className='table-hover'>{this.renderUserList()}</tbody>
        </table>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.fetchUsers.userList,
  };
}

export default connect(mapStateToProps, actions)(ManageUsers);
