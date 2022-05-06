import React, { Component } from 'react';
import Containers from '../containers/itemContainer'
class ItemPage extends Component {
  render() {
    return (
      <div className="ItemPage">
        <h1>ITEM</h1>
        <Containers />
      </div>
    );
  }
}

export default ItemPage;
