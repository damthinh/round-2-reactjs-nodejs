import '../index.css'
import React, { Component } from 'react';

class itemComponent extends Component {
    state = {
        title: '',
        id: '',
        textSearch: '',
        file: [],
        arrImg: []
    }
    handleOnchane(fileInput) {
        this.setState({ file: fileInput })
        var newArr = []
        for (let i = 0; i < fileInput.length; i++) {
            let url = URL.createObjectURL(fileInput[i])
            newArr.push(url)
        }
        this.setState({ arrImg: newArr })
    }
    handleOnclick(action) {
        var form = new FormData()
        let arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append('img', arrFile[i])
        }
        form.append('title', this.state.title)
        switch (action) {
            case 'add':
                console.log("title",this.state.title);
                this.props.addItemRequest({ form: form })
                break;

            case 'put':
                if (this.state.id !== '') {
                    console.log("coo");
                    this.props.putItemRequest({ id: this.state.id, form: form })
                } else {

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
                            console.log("id",item._id);
                        }}>update</button></td>
                        {
                            item.img ? item.img.map((img, key) => {
                                return (
                                    <td key={key}>
                                        <div className='divImg'>
                                            <img alt='' src={img} width={80} height={80} />
                                            <button className='btnImg' onClick={() => {
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
                <div>
                    <input type={'file'} multiple onChange={(e) => {
                        this.handleOnchane(e.target.files)
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
                            this.setState({ title: e.target.value })
                        }}
                    />
                    <button onClick={() => {
                        this.handleOnclick('add')
                    }}>add</button><button onClick={() => {
                        this.handleOnclick('put')
                    }}>update</button>
                </div>
            </div>
        );
    }
}

export default itemComponent;