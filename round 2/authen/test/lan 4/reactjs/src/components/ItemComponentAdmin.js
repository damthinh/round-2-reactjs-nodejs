import React, { Component } from 'react'

export default class ItemComponentAdmin extends Component {
    state={
        name:'',
        id:''
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem=this.props.listItem.map((item,key)=>{
                return(
                    <tr key={key}>
                        <td> {key+1} </td>
                        <td> {item.name} </td>
                        <td>
                            <button onClick={()=>{
                                this.props.deleteItemRequest({id:item._id})
                            }}>delete</button>
                        </td>
                        <td>
                            <button onClick={()=>{
                                this.setState({name:item.name,id:item._id})
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
                    <input value={this.state.name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }} />
                    <button onClick={()=>{
                        this.props.addItemRequest({name:this.state.name})
                    }}>add</button>
                    <button onClick={()=>{
                        this.props.updateItemRequest({name:this.state.name,id:this.state.id})
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
