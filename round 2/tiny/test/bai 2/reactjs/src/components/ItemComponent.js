import React, { Component } from 'react'
import ReviewComponent from './ReviewComponent'
import TinyComponent from './TinyComponent'
import './component.css'
export default class ItemComponent extends Component {
    state = {
        content:'',
        id:''
    }
    componentDidUpdate(){
        if (this.state.id) {
            this.setState({id:''})
        }
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item,key)=>{
                return(
                    <tr key={key}>
                        <td width={50}>{key+1}</td>
                        <td width={80}><button  onClick={()=>{
                            this.props.deleteItemRequest({id:item._id})
                        }}>delete</button></td>
                        <td width={80}><button onClick={()=>{
                            this.setState({content:item.content})
                            this.setState({id:item._id})
                            console.log("id ,conten",item.id,item.content);
                        }}>update</button></td>
                        <td>
                            {
                                <ReviewComponent item={item}/>
                            }
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
                        id={this.state.id}
                        content={this.state.content}
                    />
                </div>
            </div>
        )
    }
}
