import * as actions from '../actions/itemActions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/LoginComponent'

export class LoginContainer extends Component {
    render() {
        return (
            <div>
                <LoginComponent {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch)=> {
    return{
        registerUserRequest:(data)=>{
            dispatch(actions.registerUserRequest(data))
        },
        loginUserRequest:(data)=>{
            dispatch(actions.loginUserRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
