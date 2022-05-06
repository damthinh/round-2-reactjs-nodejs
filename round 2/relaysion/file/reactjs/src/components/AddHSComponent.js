import React, { Component } from 'react';
var id_GV =[]
class AddHSComponent extends Component {
    state = {
        name: '',
        id:''
    }
    render() {
        
        console.log('pre',this.props);
        let listGV = []
        if (this.props.listGV) {
            listGV = this.props.listGV.map((item, key) => {
                return (
                    <tr key={key}>
                        <td> {key + 1} </td>
                        <td> {item.name} </td>
                        <td>
                            <div><input type={'checkbox'} onChange={(e)=>{
                                (e.target.checked)?id_GV.push(item._id):id_GV = id_GV.filter(i => i!==item._id)
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
                    }} />
                    <button style={{display:this.props.id ? 'none':'inline-block'}} onClick={() => {
                        this.props.addHSRequest({ name: this.state.name,id_GV:id_GV })
                        id_GV=[]
                        // this.setState({ name: '' })
                    }}>add</button>
                    <button style={{display:this.props.id ? 'inline-block':'none'}} onClick={() => {
                        console.log("id_GV",id_GV);
                        this.props.updateHSRequest({name: this.state.name,id:this.props.id,id_GV:id_GV })
                        // this.setState({ name: '' })
                        id_GV=[]
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
                            {listGV}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default AddHSComponent;