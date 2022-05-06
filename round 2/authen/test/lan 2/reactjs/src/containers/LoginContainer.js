import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions' 
import LoginComponent from '../components/LoginComponent'
export class ItemContainer extends Component {
    render() {
        return (
            <div>
                <LoginComponent {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    errorMessage:store.items.errorMessage
})

const mapDispatchToProps = (dispatch)=> {
    return{
        loginUserRequest:(data)=>{
            dispatch(actions.loginUserRequest(data))
        },
        registerUserRequest:(data)=>{
            dispatch(actions.registerUserRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
