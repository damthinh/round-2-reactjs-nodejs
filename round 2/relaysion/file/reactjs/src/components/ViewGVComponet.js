import React, { Component } from 'react';

class ViewGVComponet extends Component {
    render() {
        let list = []
        if (this.props.list) {
            list = this.props.list.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td><button onClick={() => {
                            this.props.deleteOneHSOfGVRequest({id_GV:this.props.id,key:item._id})
                        }}>delete</button></td>
                    </tr>
                )
            })
        }
        return (
            <div>
                {
                    this.props.list.length >0 ?
                        <table>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>HS liên kết</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                {list}
                            </tbody>
                        </table> : null
                }
            </div>
        );
    }
}

export default ViewGVComponet;