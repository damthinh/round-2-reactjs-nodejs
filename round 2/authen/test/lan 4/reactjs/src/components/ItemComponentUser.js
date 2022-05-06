import React, { Component } from 'react'

export default class ItemComponentUser extends Component {

    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <button onClick={() => {
                    localStorage.clear()
                    window.location.href = '/'
                }}>logout</button>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
