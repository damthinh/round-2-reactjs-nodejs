import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import UserComponet from '../components/UserComponet'
export class UserContainer extends Component {
    componentDidMount(){
        this.props.getUserRequest()
    }
    render() {
        return (
            <div>
                <UserComponet {...this.props} />
            </div>
        )
    }
}


const mapStateToProps = (store) => ({
    listItem: store.items.listItem
})

const mapDispatchToProps = (dispatch)=> {
    return{
        getUserRequest:()=>{
            dispatch(actions.getUserRequest())
        },
        updateUserRequest:(data)=>{
            dispatch(actions.updateUserRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
