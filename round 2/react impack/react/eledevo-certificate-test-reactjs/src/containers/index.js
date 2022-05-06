import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../actions/index'
import Items from '../components/index'
export class itemContainer extends Component {
    componentDidMount(){
        this.props.paginationItemRequest({activePage:1})
    }
    render() {
        return (
            <div>
                <Items {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem : store.items.listItem,
    activePage : store.items.activePage,
    totalPage : store.items.totalPage,
    textSearch : store.items.textSearch,
})

const mapDispatchToProps = (dispatch)=>{
    return{
        paginationItemRequest:(data)=>{
            dispatch(action.paginationItemRequest(data))
        },
        addItemRequest:(data)=>{
            dispatch(action.addItemRequest(data))
        },
        putItemRequest:(data)=>{
            dispatch(action.putItemRequest(data))
        },
        deleteItemRequest:(data)=>{
            dispatch(action.deleteItemRequest(data))
        },
        searchItemRequest:(data)=>{
            dispatch(action.searchItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemContainer)
