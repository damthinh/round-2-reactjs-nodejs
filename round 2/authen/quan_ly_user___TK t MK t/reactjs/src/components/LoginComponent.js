import React, { Component } from 'react'

export default class LoginComponent extends Component {
    state = {
        userName: '',
        passWord: '',
        email: ''
    }
    render() {
        return (
            <div>
                <div>
                    <div>
                        email
                        <input  onChange={(e) => {
                            this.setState({ email: e.target.value })
                        }} />
                    </div>
                    <div>
                        tk
                        <input onChange={(e) => {
                            this.setState({ userName: e.target.value })
                        }} />
                    </div>
                    <div>
                        pass
                        <input type={'password'} onChange={(e) => {
                            this.setState({ passWord: e.target.value })
                        }} />
                    </div>


                    <button onClick={() => {
                        this.props.loginUserRequest({ userName: this.state.userName, passWord: this.state.passWord, })
                    }}>login</button>
                    <button onClick={() => {
                        if (this.state.email.includes('@')) {
                            this.props.registerUserRequest({ userName: this.state.userName, passWord: this.state.passWord ,email: this.state.email,})
                        } else {
                            alert('mail sai')
                        }
                        
                    }}>register</button>
                </div>
            </div>
        )
    }
}
