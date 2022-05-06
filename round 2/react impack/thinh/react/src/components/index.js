import React, { Component } from 'react'
import { LIMIT } from '../constants'

export default class Items extends Component {
    state={
        name : '',
        id:'',
        textSearch : this.props.textSearch
    }
    render() {
        let listItem =[]
        let buttons =[]
        let{activePage,totalPage}=this.props
        for(let i =1;i<=totalPage;i++){
            buttons.push(i)
        }
        let stt = (activePage-1)*LIMIT
        if(this.props.listItem){
            listItem = this.props.listItem.map((item,key)=>{
                return(
                    <tr key={key}>
                        <td width={"30px"}>{stt+key+1}</td>
                        <td width={"200px"}>{item.name}</td>
                        <td><button onClick={()=>{
                            this.props.deleteItemRequest({id:item._id})
                        }}>delete</button></td>
                        <td><button onClick={()=>{
                            this.setState({name: item.name})
                            this.setState({id: item._id})
                        }}>update</button></td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input value={this.state.name}
                        onChange={(e)=>{
                            this.setState({name: e.target.value})
                        }}
                    />
                    <button onClick={()=>{
                        this.props.addItemRequest({name:this.state.name})
                    }}>add</button>
                    <button onClick={()=>{
                        this.props.putItemRequest({id:this.state.id,name:this.state.name})
                    }}>update</button>
                    
                    
                </div>
                <div>
                    <input value={this.state.textSearch}
                        onChange={(e)=>{
                            this.setState({textSearch: e.target.value})
                        }}
                    />
                    <button onClick={()=>{
                        this.props.searchItemRequest({textSearch:this.state.textSearch})
                    }}>search</button>
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
                <div>
                    {
                        buttons.map((item,key)=>{
                            return(
                                <button key={key}
                                style={{backgroundColor:item===activePage? "gray":"white"}}
                                onClick={()=>{
                                    this.props.pagiItemRequest({activePage:item})
                                }}>{item}</button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
