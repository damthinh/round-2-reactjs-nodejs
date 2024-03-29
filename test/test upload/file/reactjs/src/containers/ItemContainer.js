import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import ItemComponent from '../components/ItemComponent'
export class ItemContainer extends Component {
    componentDidMount(){
        this.props.getItemRequest()
    }
    render() {
        return (
            this.props.isFetching?
            <div>
              
            </div>:<ItemComponent {...this.props}/>  
        )
    }
}

const mapStateToProps = (store) => ({
    listItem : store.items.listItem,
    isFetching : store.items.isFetching
})

const mapDispatchToProps =(dispatch)=> {
    return{
        getItemRequest:()=>{
            dispatch(actions.getItemRequest())
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
        deleteOneImgItemRequest:(data)=>{
            dispatch(actions.deleteOneImgItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
