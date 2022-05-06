import React, { Component } from 'react';
class Login extends Component {
    state = {
        userName: '',
        passWord: ''
    }
    render() {
        return (
            <div>
                <div>
                    <input value={this.state.userName} onChange={(e) => {
                        this.setState({ userName: e.target.value })
                    }} />
                    <input value={this.state.passWord} onChange={(e) => {
                        this.setState({ passWord: e.target.value })
                    }} />
                        <button onClick={() => {
                            if (this.state.userName&&this.state.passWord) {
                                this.props.loginItemRequest({ userName: this.state.userName, passWord: this.state.passWord })
                                
                            } else {
                                alert('nhap tk mk')
                            }
                        }}>login</button>
                        <button onClick={() => {
                            if (this.state.userName&&this.state.passWord) {
                                this.props.registerItemRequest({ userName: this.state.userName, passWord: this.state.passWord })
                            } else {
                                alert('nhap tk mk')
                            }
                            
                        }}>register</button>
                </div>
            </div>
        );
    }
}

export default Login;