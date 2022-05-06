import React, { Component } from 'react'

export default class ItemComponentAdmin extends Component {
    state = {
        name: '',
        id: ''
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <th> {key + 1} </th>
                        <td>{item.name}</td>
                        <td>
                            <button onClick={() => {
                                this.props.deleteItemRequest({ id: item._id })
                            }}>delete</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                this.setState({ name: item.name, id: item._id })
                            }}>update</button>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <button onClick={()=>{
                        localStorage.clear()
                        window.location.href = '/'
                    }}>logout</button>
                </div>
                <div>
                    <button onClick={()=>{
                        window.location.href = '/user'
                    }}>quan ly user</button>
                </div>
                <div>
                    <input value={this.state.name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} />
                    <button style={{ display: this.state.id ? 'none' : 'inline-block' }} onClick={() => {
                        this.props.addItemRequest({ name: this.state.name })
                        this.setState({name:''})
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block':'none' }} onClick={() => {
                        this.props.updateItemRequest({ name: this.state.name, id: this.state.id })
                        this.setState({name:'',id:''})
                    }}>update</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
