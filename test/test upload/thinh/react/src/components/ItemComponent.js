import './component.css'

import React, { Component } from 'react'

export default class ItemComponent extends Component {
    state = {
        title: '',
        id: '',
        file: [],
        arrImg: []
    }
    handleDeleteOneImg(i){
        let newArrImg = this.state.arrImg
        newArrImg.splice(i,1)
        this.setState({arrImg:newArrImg})
        let newFile = Array.from(this.state.file)
        newFile.splice(i,1)
        this.setState({file:newFile})
    }
    handleOnchange(fileInput){
        this.setState({file:fileInput})
        let newArr = []
        for (let i = 0; i < fileInput.length; i++) {
            let url = URL.createObjectURL(fileInput[i])
            newArr.push(url)
        }
        this.setState({arrImg:newArr})
    }
    handleOnclick(action){
        var form = new FormData()
        let arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append('img',arrFile[i])
        }
        form.append('title',this.state.title)
        switch (action) {
            case 'add':
                this.props.addItemRequest({form:form})
                break;
                case 'update':
                    if (this.state.id !== '') {
                        this.props.updateItemRequest({id:this.state.id,form:form})
                    } else {
                        alert('chọn id để update')
                    }
                    break;
            default:
                break;
        }
    }
    render() {
        let listItem = []
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.title}</td>
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ title: item.title })
                            this.setState({ id: item._id })
                        }}>update</button></td>
                        {
                            item.img ? item.img.map((img, index) => {
                                return (
                                    <td key={index}>
                                        <div className='divImg'>
                                            <img alt='' src={img} width={80} height={80} />
                                            <button className='btnImg'
                                                onClick={() => {
                                                    this.props.deleteOneImgItemRequest({ id: item._id, index: index })
                                                }}
                                            >x</button>
                                        </div>
                                    </td>
                                )
                            }) : null
                        }
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input value={this.state.title}
                        onChange={(e) => {
                            this.setState({ title: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.handleOnclick('add')
                    }}>add</button>
                    <button onClick={() => {
                        this.handleOnclick('update')
                    }}>update</button>
                </div>
                <div>
                    <input type={'file'} multiple onChange={(e) => {
                        this.handleOnchange(e.target.files)
                    }} />
                    {
                        this.state.arrImg ? this.state.arrImg.map((img, i) => {
                            return (
                                <span key={i} className='divImg' >
                                    <img alt='' src={img} width={80} height={80} />
                                    <button className='btnImg'
                                        onClick={() => {
                                            this.handleDeleteOneImg(i)
                                        }}
                                    >x</button>
                                </span>
                            )
                        }) : null
                    }
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>TITLE</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                                <th>IMG</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
