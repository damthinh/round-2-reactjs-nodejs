import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/itemActions' 
import Login from '../components/Login'
export class LoginContainer extends Component {
    render() {
        if(this.props.errorMessage){
            alert(this.props.errorMessage)
        }
        return (
            <div>
                <Login {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    userName:store.items.userName,
    errorMessage:store.items.errorMessage
})

const mapDispatchToProps = (dispatch)=> {
    return{
        loginItemRequest:(data)=>{
            dispatch(actions.loginItemRequest(data))
        },
        logoutItemRequest:()=>{
            dispatch(actions.logoutItemRequest())
        },
        registerItemRequest:(data)=>{
            dispatch(actions.registerItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
