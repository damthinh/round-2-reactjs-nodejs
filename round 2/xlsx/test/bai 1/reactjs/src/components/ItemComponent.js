import React, { Component } from 'react'
import XLSX from 'xlsx'
export default class ItemComponent extends Component {
    state = {
        age: '',
        name: '',
        id: '',
        fileExcel: ''
    }
    handleExport(listExcel) {
        // let dataExcel = XLSX.utils.json_to_sheet(listExcel)
        // let dataSheet = { Sheets: { 'Sheet1': dataExcel }, SheetNames: ['Sheet1'] };
        // XLSX.writeFile(dataSheet, 'filename' + '.xlsx');

        const ws = XLSX.utils.json_to_sheet(listExcel);
        const wb = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };
        XLSX.writeFile(wb, 'filename.xlsx');
    }

    handleOnclick(action) {
        var form = new FormData()
        form.append('name', this.state.name)
        form.append('age', this.state.age)
        switch (action) {
            case 'upload':
                
                for (let i = 0; i < this.state.fileExcel.length; i++) {
                    form.append('excel', this.state.fileExcel[i])
                }
                this.props.uploadExcelRequest({ form: form })
                this.setState({ fileExcel: '' })
                const file = document.querySelector('.file');
                file.value = '';
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
        let listPage = []
        let listExcel = []
        let buttons = []
        let { activePage, totalPage } = this.props
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(i)
        }
        if (this.props.listExcel) {
            this.props.listExcel.map((item, key) => {
                listExcel.push({ ID: Math.round(Math.random() * 1E5), STT: key + 1, NAME: item.name, AGE: item.age })
                return (
                    <td key={key}></td>
                )
            })
        }
        if (this.props.listPage) {
            listPage = this.props.listPage.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td> {item.name} </td>
                        <td> {item.age} </td>
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
        if (totalPage) {
            buttons = buttons.map((item, i) => {
                return (
                    <button key={i}
                        style={{ backgroundColor: item === activePage ? 'gray' : 'white' }}
                        onClick={() => {
                            if (listPage.length === 0) {

                            } else {
                                this.props.paginatinonExcelRequest({ activePage: item })
                            }
                        }}
                    >{item}</button>
                )
            })
        }
        return (
            <div>
                <div>
                    <input type={'file'} className='file' onChange={(e) => {
                        this.setState({ fileExcel: e.target.files })
                    }} />
                    <button style={{ display: this.state.fileExcel ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnclick('upload')
                    }} >upload</button>
                </div>
                <div>
                    <input className='file' value={this.state.name} onChange={(e) => {
                        this.setState({ name: e.target.value })
                    }} />
                    <input value={this.state.age} onChange={(e) => {
                        this.setState({ age: e.target.value })
                    }} />
                    <button style={{ display: this.state.id ? 'none' : 'inline-block' }} onClick={() => {
                        this.handleOnclick('add')
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnclick('update')

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
                    {buttons}
                </div>
                <div>
                    <button onClick={() => {
                        if (listExcel.length === 0) {
                            alert('ko co gi de xuat')
                        } else {
                            this.handleExport(listExcel)
                        }

                    }}>export</button>
                </div>
            </div>
        )
    }
}
