import React from 'react';
import EditButton from '../buttons/EditUserButton';
import DeleteButton from '../buttons/DeleteUserButton';

const UserProfile = ({ user }) => {
  console.log(user);
  return (
    <React.Fragment>
      <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>

        <td>
          <EditButton />
        </td>
        <td>
          <DeleteButton />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default UserProfile;
