import React, { Component } from 'react'

export default class LoginComponent extends Component {
    state={
        userName:'',
        passWord:''
    }
    render() {
        return (
            <div>
                <div>
                    <input onChange={(e)=>{
                        this.setState({userName:e.target.value})
                    }} />
                    <input onChange={(e)=>{
                        this.setState({passWord:e.target.value})
                    }} />
                    <button onClick={()=>{
                        this.props.loginUserRequest({userName:this.state.userName,passWord:this.state.passWord})
                    }}>login</button>
                    <button onClick={()=>{
                        this.props.registerUserRequest({userName:this.state.userName,passWord:this.state.passWord})
                    }}>register</button>
                </div>
            </div>
        )
    }
}
