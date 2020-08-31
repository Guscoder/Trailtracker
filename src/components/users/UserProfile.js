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
        {/* <td>
          <table className='table'>
            <tr>
              <th scope='col'>First Aid Certification</th>
            </tr>
            <tr>
              <td>Start Date: </td>
              <td>nov</td>
            </tr>
            <tr>
              <td>Expires: </td>
              <td>nov</td>
            </tr>
            <tr>
              <th scope='col'>Sawyer Certification</th>
            </tr>
            <tr>
              <td>Start Date: </td>
              <td>nov</td>
            </tr>
            <tr>
              <td>Expires: </td>
              <td>nov</td>
            </tr>
          </table>
        </td> */}
        <td>
          <EditButton />
        </td>
        <td>
          <DeleteButton userEmail={user.email} />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default UserProfile;
