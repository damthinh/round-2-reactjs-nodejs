import React, { Component } from 'react'
import XLSX from 'xlsx'
export default class ItemComponent extends Component {
    state = {
        name: '',
        age: '',
        id: '',
        fileExcel: ''
    }
    handleOnclick(action) {
        var form = new FormData()
        form.append('name', this.state.name)
        form.append('age', this.state.age)
        switch (action) {
            case 'upload':
                form.append('excel', this.state.fileExcel[0])
                this.props.uploadExcelRequest({ form: form })
                this.setState({ fileExcel: '' })
                let inputExcel = document.querySelector('.inputExcel')
                inputExcel.value = ''
                break;
            case 'add':
                this.props.addExcelRequest({ form: form })
                this.setState({ name: '', age: '' })
                break;
            case 'update':
                this.props.updateExcelRequest({ id: this.state.id, form: form })
                this.setState({ name: '', age: '', id: '' })
                break;
            default:
                break;
        }
    }
    render() {
        let listExcel = []
        let listPage = []
        let buttons = []
        let btn = []
        let { activePage, totalPage } = this.props
        if (this.props.listExcel) {
            this.props.listExcel.map((item, key) => {
                listExcel.push({ ID: Math.round(Math.random() * 1E9), STT: key + 1, NAME: item.name, AGE: item.age })
                return (
                    <tr key={key}></tr>
                )
            })
        }
        if (this.props.listPage) {
            listPage = this.props.listPage.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td><button onClick={() => {
                            this.props.deleteExcelRequest({ id: item._id })
                        }}>delete</button></td>
                        <td><button onClick={() => {
                            this.setState({ name: item.name })
                            this.setState({ age: item.age })
                            this.setState({ id: item._id })
                        }}>update</button></td>
                    </tr>
                )
            })
        }
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(i)

        }
        if (totalPage) {
            btn = buttons.map((item, i) => {
                return (
                    <button key={i}
                        style={{ backgroundColor: item === activePage ? 'gray' : 'white' }}
                        onClick={() => {
                            if (listPage.length > 0) {
                                this.props.paginationExcelRequest({ activePage: item })
                            }
                        }}
                    >{item}</button>
                )
            })
        }
        return (
            <div>
                <div>
                    <input type={'file'} className='inputExcel' onChange={(e) => {
                        this.setState({ fileExcel: e.target.files })
                    }} />
                    <button style={{ display: this.state.fileExcel ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnclick('upload')
                    }}>upload</button>
                </div>
                <div>
                    <input value={this.state.name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} />
                    <input value={this.state.age} onChange={(e) => {
                        this.setState({ age: e.target.value })
                    }} />
                    <button style={{ display: this.state.id ? 'none' : 'inline-block' }} onClick={() => {
                        if (this.state.name && this.state.age) {
                            this.handleOnclick('add')
                        } else {
                            alert('nhap thong tin')
                        }
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block' : 'none' }} onClick={() => {
                        if (this.state.name && this.state.age) {
                            this.handleOnclick('update')
                        } else {
                            alert('nhap thong tin')
                        }
                    }}>update</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th>AGE</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                            </tr>
                            {listPage}
                        </tbody>
                    </table>
                </div>
                <div>
                    {btn}
                </div>
                <div>
                    <button onClick={() => {
                        if (listExcel.length > 0) {
                            let ws = XLSX.utils.json_to_sheet(listExcel)
                            let wb = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] }
                            XLSX.writeFile(wb, 'exportExcel.xlsx')
                        } else {
                            alert('khong co gi export')
                        }
                    }}>export</button>
                </div>
            </div>
        )
    }
}
