import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class ItemComponent extends Component {
    state = {
        name: '',
        id: '',
        passWord: ''
    }

    render() {
        let role = localStorage.getItem('role')
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <th> {key + 1} </th>
                        <th> {item.name} </th>
                        <td>
                            {
                                role === '1' ?
                                    <div>
                                        <td>
                                            <button onClick={() => {
                                                this.props.deleteItemRequest({ id: item._id })
                                            }}>delete</button>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                                                this.setState({ name: item.name })
                                                this.setState({ id: item._id })
                                            }}>update</button>
                                        </td>
                                    </div> : null
                            }
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>

                <div>

                    <button onClick={() => {
                        this.props.logoutItemRequest()
                    }}>logout</button>
                </div>
                <div>
                    {
                        role === '1' ?
                            <div>
                                <input value={this.state.name} onChange={(e) => {
                                    this.setState({ name: e.target.value })
                                }} />
                                <button onClick={() => {
                                    this.props.addItemRequest({ name: this.state.name })
                                    this.setState({ name: '' })
                                }}>add</button>
                                <button onClick={() => {
                                    this.props.updateItemRequest({ id: this.state.id, name: this.state.name })
                                    this.setState({ name: '', id: '' })
                                }}>update</button>
                            </div>
                            : null
                    }
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                {
                                    role === '1' ?
                                        <div>
                                            <th>DELETE</th>
                                            <th>UPDATE</th>
                                        </div> : null
                                }
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
