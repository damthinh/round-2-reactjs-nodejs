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
    handleFileOnechage(fileInput) {
        this.setState({ file: fileInput })
        var arrNew = []
        for (let i = 0; i < fileInput.length; i++) {
            let url = URL.createObjectURL(fileInput[i])
            arrNew.push(url)
        }
        this.setState({ arrImg: arrNew })
    }
    handleOnclick(action) {
        var form = new FormData()
        var arrFile = this.state.file
        for (let i = 0; i < arrFile.length; i++) {
            form.append('img', arrFile[i])
        }
        form.append('title', this.state.title)
        switch (action) {
            case 'add':
                this.props.addItemRequest({ form: form })
                break;
            case 'update':
                if (this.state.id !== '') {
                    console.log("id", this.state.id);
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
                                    // <td key={key}>
                                    //     <div className='divImg'>
                                    //         <img alt='' src={img} width={80} height={80} />
                                    //         <button className='buttonImg' onClick={() => {
                                    //             console.log(item._id);
                                    //             this.props.deleteOneImgItemRequest({ id: item._id, nameImg: img.slice(22) })
                                    //         }}>x</button>
                                    //     </div>
                                    // </td>
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
                    <button style={{display :this.props.textSearch ? "inline-block":"none"}} onClick={() => {
                        this.props.searchItemRequest({ textSearch: '' })
                        this.setState({textSearch:''})
                    }}>back</button>
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
                        this.handleFileOnechage(e.target.files)
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
                    }}>add</button>
                    <button onClick={() => {
                        this.handleOnclick('update')
                    }}>update</button>
                </div>
            </div>
        );
    }
}

export default itemComponent;