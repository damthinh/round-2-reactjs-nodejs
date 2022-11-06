import React, { Component } from 'react'
import { LIMIT } from '../constants'

export default class index extends Component {
    state = {
        name: '',
        id: '',
        textSearch: this.props.textSearch,
        activePage: this.props.activePage
    }
    render() {
        let listItem = []
        let buttons = []
        let { activePage, totalPage } = this.props
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(i)
        }
        let stt = (activePage - 1) * LIMIT
        if (totalPage === 1) {
            buttons = buttons.map((item, key) => {
                return (
                    <button key={key}
                        style={{ backgroundColor: 'gray' }}
                    >{item}</button>
                )
            })
        } else {
            buttons = buttons.map((item, key) => {
                return (
                    <button key={key}
                        style={{ backgroundColor: item === activePage ? 'gray' : 'white' }}
                        onClick={() => {
                            this.setState({ activePage: item })
                            this.props.paginationitemRequest({ activePage: item })
                        }}
                    >{item}</button>
                )
            })
        }
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{stt + key + 1}</td>
                        <td width={'200px'}>{item.name}</td>
                        <td><button
                            style={{ width: '80px' }}
                            onClick={() => {
                                if (listItem.length === 1) {
                                    this.setState({ activePage: activePage - 1 })
                                    console.log("ac", this.state.activePage);
                                } else {
                                    this.setState({ activePage: activePage })
                                    console.log("ac", this.state.activePage);
                                }
                                this.props.deleteItemRequest({ id: item._id })
                            }}>delete</button></td>
                        <td><button
                            style={{ width: '80px' }}
                             onClick={() => {
                            this.setState({ name: item.name })
                            this.setState({ id: item._id })
                        }}>update</button></td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input value={this.state.name}
                        onChange={(e) => {
                            this.setState({ name: e.target.value })
                        }}
                    />
                    <button
                        style={{ width: '80px' }}
                        onClick={() => {
                            console.log("leng",listItem.length);
                            if (listItem.length === LIMIT) {
                                console.log("leng",listItem.length);
                                this.setState({ activePage: totalPage + 1 })
                            } else {
                                this.setState({ activePage: totalPage })
                            }
                            this.props.addItemRequest({ name: this.state.name })
                        }}>add</button>
                    <button
                        style={{ width: '80px' }}
                        onClick={() => {
                            this.props.putItemRequest({ id: this.state.id, name: this.state.name, activePage: this.state.activePage })
                        }}>update</button>
                </div>
                <div>
                    <input value={this.state.textSearch}
                        onChange={(e) => {
                            this.setState({ textSearch: e.target.value })
                        }}
                    />
                    <button
                        style={{ width: '80px' }}
                        onClick={() => {
                            this.props.searchItemRequest({ textSearch: this.state.textSearch })
                        }}>search</button>
                    <button style={{ display: this.props.textSearch ? 'inline-block' : 'none', width: '80px' }}
                        onClick={() => {
                            this.setState({ textSearch: '' })
                            this.props.searchItemRequest({ textSearch: '' })
                        }}>back</button>
                </div>
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
                <div>{buttons}</div>
            </div>
        )
    }
}
