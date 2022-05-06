import React, { Component } from 'react'

// import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
export default class ItemComponent extends Component {
    state = {
        name: '',
        age: '',
        id: '',
        form: ''
    }
    handleExport(listItemExport) {
        const ws = XLSX.utils.json_to_sheet(listItemExport);
        const wb = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };
        XLSX.writeFile(wb, 'filename' + '.xlsx');
    }
    handleOnClick(action) {
        var form = new FormData()
        switch (action) {
            case 'upload':
                for (let i = 0; i < this.state.form.length; i++) {
                    form.append('excel', this.state.form[i])
                }
                this.props.uploadExcelRequet({ form: form })
                this.setState({ form: '' })
                break;
            case 'add':
                form.append('name', this.state.name)
                form.append('age', this.state.age)
                this.props.addExcelRequet({ form: form })
                this.setState({ name: '', age: '' })
                break;
            case 'update':
                form.append('name', this.state.name)
                form.append('age', this.state.age)
                this.props.updateExcelRequet({ id: this.state.id, form: form })
                this.setState({ name: '', age: '', id: '' })
                break;
            default:
                break;
        }
    }
    render() {
        let listItem = []
        var listItemExport =[]
        if (this.props.listItem) {
            listItem = this.props.listItem.map((item, key) => {
                listItemExport.push({id:key+1,name:item.name,age:item.age})
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>
                            <button onClick={() => {
                                this.props.deleteExcelRequet({ id: item._id })
                            }}>delete</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                this.setState({ name: item.name })
                                this.setState({ age: item.age })
                                this.setState({ id: item._id })
                            }}>update</button>
                        </td>
                    </tr>
                )
            })

        }
        return (
            <div>
                <div>
                    <input type={'file'} onChange={(e) => {
                        this.setState({ form: e.target.files })
                    }} />
                    <button style={{ display: this.state.form ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnClick('upload')
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
                        this.handleOnClick('add')
                    }}>add</button>
                    <button style={{ display: this.state.id ? 'inline-block' : 'none' }} onClick={() => {
                        this.handleOnClick('update')
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
                            {listItem}
                        </tbody>
                    </table>
                </div>
                <button onClick={() => {
                    if (listItemExport.length>0) {
                        this.handleExport(listItemExport)
                    } else {
                        alert('ko co gi de xuat')
                    }
                }}>export</button>
            </div>
        )
    }
}
