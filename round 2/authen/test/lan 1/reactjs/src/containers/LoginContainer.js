import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginComponet from '../components/LoginComponet'
import * as actions from '../actions/itemActions' 

export class LoginContainer extends Component {
    render() {
        if (this.props.errorMessage) {
            alert(`${this.props.errorMessage}`)
        }
        return (
            <div>
                <LoginComponet {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    errorMessage: store.items.errorMessage
})

const mapDispatchToProps = (dispatch) =>{
    return{
        loginUserRequest:(data)=>{
            dispatch(actions.loginUserRequest(data))
        },
        registerUserRequest:(data)=>{
            dispatch(actions.registerUserRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
