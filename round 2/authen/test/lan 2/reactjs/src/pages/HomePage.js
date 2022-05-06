import React, { Component } from 'react';
import LoginContainer from '../containers/LoginContainer';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <h1>HOME</h1>
        <LoginContainer />
      </div>
    );
  }
}

export default HomePage;
