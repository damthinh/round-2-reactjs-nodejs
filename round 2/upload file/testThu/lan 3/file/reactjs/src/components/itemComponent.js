import './component.css'
import React, { Component } from 'react'

export default class itemComponent extends Component {
    state = {
        title: '',
        id: '',
        textSearch: '',
        file: [],
        arrImg: []
    }
    deleteHandle(key) {
        let array = this.state.arrImg;
        array.splice(key, 1)
        this.setState({ arrImg: array })
        let fileArray = Array.from(this.state.file);
        fileArray.splice(key, 1)
        this.setState({ file: fileArray })
    }
    handleOnChane(fileInput) {
        this.setState({ file: fileInput })
        let newArr = []
        for (let i = 0; i < fileInput.length; i++) {
            let url = URL.createObjectURL(fileInput[i])
            newArr.push(url)
        }
        this.setState({ arrImg: newArr })
        console.log("file", fileInput);
    }
    handleOnclick(action) {
        var form = new FormData()
        let arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append('img', arrFile[i])
        }
        form.append("title", this.state.title)
        console.log("arrr", arrFile);
        switch (action) {
            case 'add':
                this.props.addItemRequest({ form: form })
                break;
            case 'update':
                if (this.state.id !== '') {
                    this.props.updateItemRequest({ id: this.state.id, form: form })
                } else {
                    alert('chon id')
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
                        <td width={50}>{key + 1}</td>
                        <td>{item.title}</td>
                        <td><button
                            onClick={() => {
                                this.props.deleteItemRequest({ id: item._id })
                            }}
                        >delete</button></td>
                        <td><button
                            onClick={() => {
                                this.setState({ title: item.title })
                                this.setState({ id: item._id })
                            }}
                        >update</button></td>
                        {
                            item.img ? item.img.map((img, index) => {
                                return (
                                    <td key={index}>
                                        <div className='divImg'>
                                            <img alt='' src={img} width={80} height={80} />
                                            <button className='btnImg' onClick={() => {
                                                this.props.deteteOneImgItemRequest({ id: item._id, nameImg: index })
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
                </div>
                <div>
                    <input type={'file'} multiple onChange={(e) => {
                        this.handleOnChane(e.target.files)
                    }} />
                    {
                        this.state.arrImg ? this.state.arrImg.map((img, key) => {
                            return (
                                <span key={key} className='divImg'>
                                    <img alt='' src={img} width={80} height={80} />
                                    <button className='btnImg' onClick={() => {
                                        this.deleteHandle(key)
                                    }}>x</button>
                                </span>

                            )
                        }) : null
                    }
                </div>
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
