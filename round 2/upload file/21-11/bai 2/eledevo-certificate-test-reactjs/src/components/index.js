import '../style/component.css'
import React, { Component } from 'react'
var ADD = 'ADD', UPDATE = 'UPDATE'

export default class itemComponent extends Component {
    state = {
        title: '',
        id: '',
        textSearch: '',
        file: [],
        arrImg: []
    }
    handleChangeFile(fileInput) {
        var newArr = []
        this.setState({ file: fileInput })
        for (var i = 0; i < fileInput.length; i++) {
            const opjectURL = URL.createObjectURL(fileInput[i])
            newArr.push(opjectURL)
        }
        this.setState({ arrImg: newArr })
    }


    handOnClick(action) {
        const form = new FormData()
        var arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append("img", arrFile[i])
        }
        form.append("title", this.state.title)
        switch (action) {
            case ADD:
                this.props.addItemRequest({ form: form });
                this.setState({ arrImg: '' })
                break;
                
            case UPDATE:
                this.props.putItemRequest({ form: form, id: this.state.id }); 
                this.setState({ arrImg: '' })
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
                        <td><button onClick={() => {
                            this.props.deleteItemRequest({ id: item._id })
                        }}>delete</button></td><td><button onClick={() => {
                            this.setState({ title: item.title })
                            this.setState({ id: item._id })
                        }}>update</button></td>
                        <td width={80}>{item.title}</td>
                        {
                            item.img ? item.img.map((img, key) => {
                                return (
                                    <td key={key}>
                                        <div className='imgcss'>
                                            <img alt='có cái nịt' src={img} width={80} height={80} ></img>
                                            <button
                                                className='buttonImg'
                                                onClick={() => {
                                                    console.log("img", img.slice(22));
                                                    this.props.deleteOneImgItemRequest({ id: item._id, img: img.slice(22) })
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
                        }} />
                    <button onClick={() => {
                        this.props.searchItemRequest({ textSearch: this.state.textSearch })
                    }}>search</button>
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th>IMG</th>
                            </tr>
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type='file' multiple onChange={(e) => {
                        this.handleChangeFile(e.target.files)
                    }} />
                    {
                        (this.state.arrImg) ? this.state.arrImg.map((img, i) => {
                            return (
                                <img alt='' key={i} src={img} width={"80px"} height={"80px"} />
                            )
                        }) : null
                    }
                </div>
                <div>
                    <input value={this.state.title}
                        onChange={(e) => {
                            this.setState({ title: e.target.value })
                        }} />
                    <button onClick={() => {
                        this.handOnClick(ADD)
                    }}>add</button><button onClick={() => {
                        this.handOnClick(UPDATE)
                        this.setState({ arrImg: '' })
                    }}>update</button>
                </div>
            </div>
        )
    }
}
