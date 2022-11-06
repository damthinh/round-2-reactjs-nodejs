import React, { Component } from 'react';
import ItemContainer  from '../containers/ItemContainer';

class ItemPage extends Component {
  render() {
    return (
      <div className="ItemPage">
        <h1>ITEM</h1>
        <ItemContainer/>
      </div>
    );
  }
}

export default ItemPage;
