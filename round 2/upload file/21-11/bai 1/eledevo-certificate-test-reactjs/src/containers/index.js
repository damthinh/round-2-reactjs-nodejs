import React, { Component } from 'react'
import * as action from '../actions/index'
import { connect } from 'react-redux'
import Items from '../components/index'
export class itemContainer extends Component {
    componentDidMount(){
        this.props.getItemRequestet()
    }
    render() {
        return (
            <div>
                <Items {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem : store.items.listItem
})

const mapDispatchToProps = (dispatch)=>{
    return{
        getItemRequestet:()=>{
            dispatch(action.getItemRequest())
        },
        addItemRequest:(data)=>{
            dispatch(action.addItemRequest(data))
        },
        deleteItemRequest:(id)=>{
            dispatch(action.deleteItemRequest(id))
        },
        updateItemRequest:(data)=>{
            dispatch(action.updateItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemContainer)
