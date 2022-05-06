import React, { Component } from 'react';

class ViewComponent extends Component {
    render() {
        let list = []
        if (this.props.list) {
            list = this.props.list.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td><button onClick={() => {
                            this.props.deleteOneGVOfHSRequest({id_HS:this.props.id,key:item._id})
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
                                    <th>Giáo viên liên kết</th>
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

export default ViewComponent;