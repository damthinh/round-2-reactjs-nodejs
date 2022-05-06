import React, { Component } from 'react'
import AddGVComponent from './AddGVComponent'
import AddHSComponent from './AddHSComponent'
import ViewGVComponet from './ViewGVComponet'
import ViewComponent from './ViewHSComponent'

export default class ItemComponent extends Component {
    state = {
        name: '',
        id: '',
        listHS: '',
        listGV: '',
        keyHS: '',
        keyGV: '',
        add: false,
        addHS: '',
        addGV: ''
    }
    render() {
        let listGV = []
        if (this.props.listGV) {
            listGV = this.props.listGV.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td>{item.id_SV}</td>
                        <td><button onClick={() => {
                            this.props.deleteGVRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ add: true, addHS: false ,id: item._id })
                        }}>update</button></td>
                        <td><button
                            style={{ backgroundColor: key === this.state.keyGV ? 'blue' : 'white' }}
                            onClick={() => {
                                this.setState({ listGV: item.id_HS, id: item._id, keyGV: key })
                            }} >view</button></td>
                    </tr>
                )
            })
        }
        let listHS = []
        if (this.props.listHS) {
            listHS = this.props.listHS.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td><button onClick={() => {
                            this.props.deleteHSRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ id: item._id, add: true, addHS: true })
                        }}>update</button></td>
                        <td><button
                            style={{ backgroundColor: key === this.state.keyHS ? 'blue' : 'white' }}
                            onClick={() => {
                                this.setState({ listHS: item.id_GV, id: item._id, keyHS: key })
                            }} >view</button></td>
                    </tr>
                )
            })
        }
        return (
            <div>

                <div>
                    <button style={{display:this.state.id ? 'none':'inline-block'}} onClick={() => {
                        this.setState({ add: true, addHS: true })
                    }}>addHS</button>

                    <button style={{display:this.state.id ? 'none':'inline-block'}} onClick={() => {
                        this.setState({ add: true, addHS: false })
                    }}>addGV</button>
                    <button onClick={() => {
                        this.setState({ add: '', name: '', id: '' })
                    }}>back</button>
                </div>
                {

                }
                {
                    this.state.add === true ? (this.state.addHS === true ? <AddHSComponent {...this.props}
                        id={this.state.id}
                    /> : <AddGVComponent {...this.props} id={this.state.id} />) :
                        <div>
                            <div>
                                GV
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>NAME</th>
                                            <th>DELETE</th>
                                            <th>UPDATE</th>
                                        </tr>
                                        {listGV}

                                    </tbody>
                                </table>

                                <div>
                                    <ViewGVComponet {...this.props}
                                        list={this.state.listGV}
                                        id={this.state.id}
                                    />
                                </div>
                                HS
                                <table>

                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>NAME</th>
                                            <th>GV liên kết</th>
                                            <th>DELETE</th>
                                            <th>UPDATE</th>
                                        </tr>
                                        {listHS}
                                    </tbody>
                                </table>

                                <div>
                                    <ViewComponent {...this.props}
                                        list={this.state.listHS}
                                        id={this.state.id}
                                    />
                                </div>
                            </div>
                        </div>
                }

            </div>
        )
    }
}