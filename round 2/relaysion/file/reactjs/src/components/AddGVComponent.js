import React, { Component } from 'react';
var id_HS = []
class AddGVComponent extends Component {
    state={
        name:''
    }
    render() {
        let listHS = []
        if (this.props.listHS) {
            listHS = this.props.listHS.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td>
                            <div><input type={'checkbox'} onChange={(e)=>{
                                (e.target.checked)?id_HS.push(item._id):id_HS = id_HS.filter(i => i!==item._id)
                            }} /></div>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div>
                <div>
                    <input onChange={(e) => {
                        this.setState({ name: e.target.value })
                        console.log({ name: this.state.name,id_HS:id_HS });
                    }} />
                    <button style={{display:this.props.id ? 'none':'inline-block'}} onClick={() => {
                        console.log({ name: this.state.name,id_HS:id_HS });
                        this.props.addGVRequest({ name: this.state.name,id_HS:id_HS })
                        id_HS=[]
                    }}>add</button>
                    <button style={{display:this.props.id ? 'inline-block':'none'}} onClick={() => {
                        console.log({ name: this.state.name,id_HS:id_HS });
                        this.props.updateGVRequest({ name: this.state.name,id_HS:id_HS ,id:this.props.id})
                        id_HS=[]
                    }}>update</button>
                </div>
                <div>
                        <h2>các giáo viên</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>NAME</th>
                                <th><div>CHOOSE</div></th>
                            </tr>
                            {listHS}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AddGVComponent;