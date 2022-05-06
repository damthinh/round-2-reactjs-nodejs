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
                                    <button onClick={() => {
                                        this.props.deleteItemRequest({ id: item._id })
                                    }}>delete</button>
                                    : null
                            }
                        </td>
                        <td>
                            {
                                role === '1' ?
                                    <button onClick={() => {
                                        this.setState({ name: item.name })
                                        this.setState({ id: item._id })
                                    }}>update</button>
                                    : null
                            }
                        </td>
                        {


                            // role === '1' ?
                            //     <div>
                            //         <td><button onClick={() => {
                            //             this.props.deleteItemRequest({ id: item._id })
                            //         }}>delete</button></td>
                            //         <td><button onClick={() => {
                            //             this.setState({ name: item.name })
                            //             this.setState({ id: item._id })
                            //         }}>update</button></td>
                            //     </div>
                            //     : null
                        }

                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <button onClick={() => {
                        window.location.href = '/'
                        localStorage.clear()
                    }}>logout</button>
                </div>
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
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th>
                                    {
                                        role === '1' ? 'DELETE' : null
                                    }
                                </th>
                                <th>
                                    {
                                        role === '1' ? 'UPDATE' : null
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
