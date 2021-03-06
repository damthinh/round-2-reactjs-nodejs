import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import ItemComponent from '../components/ItemComponent'
export class ItemContainer extends Component {
    componentDidMount(){
        this.props.searchItemRequest({textSearch : ''})
    }
    render() {
        return (
            <div>
                <ItemComponent {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem : store.items.listItem
})

const mapDispatchToProps = (dispatch) =>{
    return{
        searchItemRequest:(data)=>{
            dispatch(actions.searchItemRequest(data))
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
