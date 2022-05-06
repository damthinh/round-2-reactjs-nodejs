import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions' 
import ItemComponent from '../components/ItemComponent'
import Login from '../components/Login'
export class ItemContainer extends Component {
    componentDidMount(){
        this.props.getItemRequest()
    }
    render() {
        if(this.props.errorMessage){
            alert(this.props.errorMessage)
        }
        return (
            <div>
                <ItemComponent {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem:store.items.listItem,
    errorMessage:store.items.errorMessage,
})

const mapDispatchToProps = (dispatch)=> {
    return{
        getItemRequest:(data)=>{
            dispatch(actions.getItemRequest(data))
        },
        addItemRequest:(data)=>{
            dispatch(actions.addItemRequest(data))
        },
        updateItemRequest:(data)=>{
            dispatch(actions.updateItemRequest(data))
        },
        deleteItemRequest:(data)=>{
            dispatch(actions.deleteItemRequest(data))
        },
        logoutItemRequest:(data)=>{
            dispatch(actions.logoutItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
