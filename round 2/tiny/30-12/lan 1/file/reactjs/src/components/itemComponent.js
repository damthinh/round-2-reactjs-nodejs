import '../index.css'
import React, { Component } from 'react';
import TinyComponent from './TinyComponent';
import ComponentReview from './ComponentReview';
class itemComponent extends Component {
    state = {
        id: '',
        textSearch: '',
        content: ''
    }
    componentDidUpdate() {
        if (this.state.id !== '') {
            this.setState({id: '' })
        }
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                            this.setState({ item: '' })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ title: '', id: item._id, content: item.content })
                        }}>update</button></td>
                        <td>{
                            item.content ? <ComponentReview item={item} /> : null
                        } </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input value={this.state.textSearch}
                        onChange={(e) => {
                            this.setState({ textSearch: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }}>search</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                                <th>CONTENT</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <div>
                    <TinyComponent
                        content={this.state.content}
                        id={this.state.id}
                        {...this.props} />
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default itemComponent;