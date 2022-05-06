import '../index.css'
import React, { Component } from 'react';
import Tinycomponent from './Tinycomponent';
import ReviewComponent from './ReviewComponent';

class itemComponent extends Component {
    state = {
        content: '',
        id: '',
        textSearch: '',
    }
    componentDidUpdate() {
        if (this.state.id) {
            this.setState({id:''})
        }
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ content: item.content })
                            this.setState({ id: item._id })
                            console.log("id", item._id);
                        }}>update</button></td>
                        <td >
                            {
                                <ReviewComponent item={item} />
                            }
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input value={this.state.textSearch}
                        onChange={(e) => {
                            this.setState({ textSearch: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }}>search</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                                <th>content</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Tinycomponent {...this.props}
                        content={this.state.content}
                        id={this.state.id}
                    />
                </div>
            </div>
        );
    }
}

export default itemComponent;