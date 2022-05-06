import React, { Component } from 'react'

export default class ItemComponent extends Component {
    state = {
        name: '',
        id: '',
    }
    render() {
        let role = localStorage.getItem('role')
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td>
                            {
                                role === '1' ?
                                    <div>
                                        <button onClick={() => {
                                            this.props.deleteItemRequest({ id: item._id })
                                        }}>delete</button><button onClick={() => {
                                            this.setState({ name: item.name })
                                            this.setState({ id: item._id })
                                        }}>update</button>
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
                        localStorage.clear()
                        window.location.href = '/'
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
                            </div> : null
                    }

                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>

                                <th>
                                    {
                                        role === '1' ?
                                            <div>
                                                DELETE
                                                UPDATE
                                            </div> : null
                                    }
                                </th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
