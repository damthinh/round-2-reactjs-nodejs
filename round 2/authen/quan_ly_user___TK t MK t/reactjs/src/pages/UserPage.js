import React, { Component } from 'react';
import  UserContainer  from '../containers/UserContainer';

class UserPage extends Component {
  render() {
    return (
      <div className="UserPage">
        <h1>User</h1>
        <UserContainer />
      </div>
    );
  }
}

export default UserPage;
