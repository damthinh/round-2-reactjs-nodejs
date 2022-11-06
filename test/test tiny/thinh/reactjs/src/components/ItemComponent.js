import './components.css'
import React, { Component } from 'react'
import TinyComponent from './TinyComponent'
export default class ItemComponent extends Component {
    state ={
        content :'',
        id:''
    }
    componentDidUpdate(){
        if (this.state.id) {
            this.setState({id:''})
        }
    }
    render() {
        let listItem =[]
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item,key)=>{
                return(
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td><button onClick={()=>{
                            this.props.deleteItemRequest({id:item._id})
                        }}>delete</button></td>
                        <td><button onClick={()=>{
                         this.setState ({content:item.content,id:item._id})
                        }}>update</button></td>
                        <td>
                            <div style={{width:800 }} dangerouslySetInnerHTML={{__html:item.content}}></div>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
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
                    <TinyComponent {...this.props} 
                        content={this.state.content}
                        id={this.state.id}
                    />
                </div>
            </div>
        )
    }
}
