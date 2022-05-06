import '../index.css'
import React, { Component } from 'react'

export default class itemComponent extends Component {
    state = {
        title: '',
        id: '',
        arrImg: [],
        file: [],
        textSearch:''
    }
    handleChangeFile(fileInput) {
        var newArr = []
        this.setState({ file: fileInput })
        for (let i = 0; i < fileInput.length; i++) {
            const opjectUrl = URL.createObjectURL(fileInput[i])
            newArr.push(opjectUrl)
        }
        this.setState({ arrImg: newArr })
    }
    handOnClick(action) {
        var form = new FormData()
        var arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append("img", arrFile[i])
        }
        form.append("title", this.state.title)
        switch (action) {
            case "ADD":
                this.props.addItemRequest({ form: form })
                break;
            case "UPDATE":
                this.props.putItemRequest({ id: this.state.id, form: form })
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
                        <td><button
                            onClick={() => {
                                this.props.deleteItemRequest({ id: item._id })
                            }}
                        >delete</button></td>
                        <td><button
                            onClick={() => {
                                this.setState({ title: item.title })
                                this.setState({ id: item._id })
                                console.log("idd", this.state.id);
                            }}
                        >update</button></td>
                        {
                            item.img ? item.img.map((img, key) => {
                                return (
                                    <td key={key}>
                                        <div className='divImg'>
                                            <img alt='có cái nịt' src={img} width={80} height={80} />
                                            <button className='buttonImg' onClick={() => {
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
                    <input  value={this.state.textSearch}
                        onChange={(e) => {
                            this.setState({ textSearch: e.target.value })
                        }} />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }} >search</button>
                    <button
                        style={{display:this.props.textSearch ? 'inline-block':'none'}}
                    onClick={() => {
                        this.props.searchItemRequest({ textSearch: '' })
                        this.setState({textSearch:''})
                    }} >back</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>TITLE</th>
                                <th>IMG</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type={'file'} multiple onChange={(e) => {
                        this.handleChangeFile(e.target.files)
                    }} />
                    {
                        (this.state.arrImg) ? this.state.arrImg.map((img, key) => {
                            return (
                                <img key={key} alt='' src={img} width={80} height={80} />
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
                        this.handOnClick("ADD")
                    }}>ADD</button>
                    <button onClick={() => {
                        this.handOnClick("UPDATE")
                    }}>UPDATE</button>
                </div>
            </div>
        )
    }
}
