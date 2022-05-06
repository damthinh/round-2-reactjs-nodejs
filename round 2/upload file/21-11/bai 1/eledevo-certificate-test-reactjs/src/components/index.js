import React, { Component } from 'react'
import { ADD, UPDATE } from '../constants'

export default class index extends Component {
    state={
        title :'',
        id:'',
        arrImg :[], // [url,url1,....]
        file:[], // [file]
    }

    
    handleChangeFile(fileInput){ // mang file
        var newArr =[]
        this.setState({file:fileInput})
        for (var i = 0;i<fileInput.length;i++){
            const opjectURL = URL.createObjectURL(fileInput[i])
            newArr.push(opjectURL)
        }
        this.setState({arrImg:newArr})
        console.log('{arrimg}',this.state.arrImg);
    }


    handOnClick(action){
        const form =new FormData() // key/value
        var arrFile = this.state.file 
        for(let i = 0; i<arrFile.length;i++){
            form.append("img",arrFile[i]) 
        }
        form.append("title",this.state.title)
        // switch (action) {
        //     case 1:
        //         this.props.addItemRequest({form:form});break;
        //     case UPDATE:
        //         this.props.updateItemRequest({form:form,id:this.state.id});break;
        //     default:
        //         break;
        // }
        this.props.addItemRequest({form:form})
    }
    render() {
        let listItem =[]
        if(this.props.listItem){
            listItem= this.props.listItem.map((item,key)=>{
                return(
                    <tr key={key}>  
                        <th>{key+1}</th>
                        <th>{item.title}</th>
                        {
                            item.img?
                            item.img.map((img,index)=>{
                                return(
                                    <th key={index}><img alt='' src={img} width={'80px'} height={'80px'} /> </th>
                                   
                                )
                            }):null
                        }
                        <td><button onClick={()=>{
                            this.props.deleteItemRequest({id:item._id})
                        }}>xoa</button></td>
                        <td><button onClick={()=>{
                            this.setState({id:item._id})
                            this.setState({title:item.title})
                        }}>update</button></td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    
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
                    <input type='file' multiple onChange={(e)=>{
                        this.handleChangeFile(e.target.files)
                    }}/>
                    {
                        (this.state.arrImg)? this.state.arrImg.map((img,i)=>{
                            return(
                                <img alt='' key={i} src={img} width={"80px"} height={"80px"}/>
                            )
                        }): null
                    }
                    
                </div>
                <div>
                <input value={this.state.title}
                        onChange={(e)=>{
                            this.setState({title:e.target.value})
                        }}/>
                <button style={{width:'100'}} onClick={()=>this.handOnClick(1)}>add</button>
                <button style={{width:'100'}} onClick={()=>this.handOnClick(UPDATE)}>update</button>
                </div>
            </div>
        )
    }
}
