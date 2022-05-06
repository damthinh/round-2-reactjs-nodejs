import React, { Component } from 'react'
import { LIMIT } from '../constants'

export default class Items extends Component {
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
        let stt = (activePage - 1) * LIMIT
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(i)
        }
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
                            this.props.paginationItemRequest({ activePage: item })
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
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            console.log("ac", activePage);
                            console.log("ac2", this.state.activePage);
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
                    <button onClick={() => {
                        this.setState({ activePage: this.props.totalPage })
                        this.props.addItemRequest({ name: this.state.name })
                    }}>add</button>
                    <button onClick={() => {
                        this.props.putItemRequest({ id: this.state.id, name: this.state.name, activePage: this.state.activePage })
                    }}>update</button>
                </div>
                <div>
                    <input value={this.state.textSearch}
                        onChange={(e) => {
                            this.setState({ textSearch: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }}>search</button>
                    <button
                        style={{ display: this.props.textSearch ? "inline-block" : "none" }}
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
