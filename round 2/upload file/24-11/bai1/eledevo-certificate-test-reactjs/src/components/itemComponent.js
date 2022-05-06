import '../index.css'

import React, { Component } from 'react'
export default class Items extends Component {
    state = {
        title: '',
        id: '',
        textSearch: '',
        file: [],
        arrImg: []
    }
    handleChangeFile(fileInput) {
        this.setState({ file: fileInput })
        var arrNew = []
        for (let i = 0; i < fileInput.length; i++) {
            var url = URL.createObjectURL(fileInput[i])
            arrNew.push(url)
        }
        this.setState({ arrImg: arrNew })
    }
    handleOnClick(action) {
        var form = new FormData()
        var arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append("img", arrFile[i])
        }
        form.append('title', this.state.title)

        switch (action) {
            case "ADD":
                this.props.addItemRequest({form:form,title:this.state.title})
                break;
            case "UPDATE":
                if (this.state.id !=='') {
                    this.props.putItemRequest({id:this.state.id,form:form})
                } else {
                    alert('Chọn phần tử cần update')
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
                        <th>{key + 1}</th>
                        <td>{item.title}</td>
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ title: item.title })
                            this.setState({ id: item._id })
                        }}>update</button></td>
                        {
                            item.img ? item.img.map((img, key) => {
                                return (
                                    <td key={key}>
                                        <div className='divImg'>
                                            <img alt='' src={img} width={80} height={80} />
                                            <button className='buttonImg' onClick={() => {
                                                console.log(item._id);
                                                this.props.deleteOneImgItemRequest({ id: item._id, nameImg: img.slice(22) })
                                            }}>x</button>
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
                    <input value={this.state.textSearch}
                        onChange={(e) => { 
                            this.setState({ textSearch: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }}>search</button>
                    <button
                        style={{ display: this.props.textSearch ? 'inline-block' : 'none' }}
                        onClick={() => {
                            this.props.searchItemRequest({ textSearch: '' })
                            this.setState({ textSearch: '' })
                        }}>back</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th width={50}>STT</th>
                                <th width={150} >TITLE</th>
                                <th width={80}>Delete</th>
                                <th width={80}>Update</th>
                                <th>IMG</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type={"file"} multiple onChange={(e) => {
                        this.handleChangeFile(e.target.files)
                    }} />
                    {
                        this.state.arrImg ? this.state.arrImg.map((img, key) => {
                            return (
                                <img key={key} alt='' src={img} width={80} height={80} />
                            )
                        }) : null
                    }
                </div>
                <div>
                    <input value={this.state.title}
                        onChange={(e) => {
                            this.setState({ title: e.target.value})
                        }}
                    />
                    <button onClick={() => {
                        this.handleOnClick("ADD")
                    }}>ADD</button>
                    <button
                        onClick={() => {
                            this.handleOnClick("UPDATE")
                        }}>UPDATE</button>
                </div>
            </div>
        )
    }
}
