import React, { Component } from 'react'

export default class UserComponet extends Component {
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <th> {key + 1} </th>
                        <td>{item.userName}</td>
                        <td>{item.role}</td>
                        <td>
                            <button onClick={() => {
                                this.props.updateUserRequest({id:item._id,role:2})
                            }}>user</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                if (item.email) {
                                    this.props.updateUserRequest({id:item._id,role:1})
                                } else {
                                    alert('tk ko co mail')
                                }
                            }}>admin</button>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <button onClick={()=>{
                        window.location.href = '/items'
                    }}>get Item</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>TK</th>
                                <th>QUYỀN</th>
                                <th>USRE</th>
                                <th>ADMIN</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
