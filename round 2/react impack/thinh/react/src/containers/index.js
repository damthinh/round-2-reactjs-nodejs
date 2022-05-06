import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from "../actions/index"
import Items from '../components/index'
export class itemContainer extends Component {
    componentDidMount(){
        this.props.pagiItemRequest({activePage:1})
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
    listItem: store.items.listItem,
    totalPage: store.items.totalPage,
    activePage: store.items.activePage,
    textSearch: store.items.textSearch,
})

const mapDispatchToProps = (dispatch)=>{
    return{
        pagiItemRequest:(data)=>{
            dispatch(action.pagiItemRequest(data))
        },
        addItemRequest:(data)=>{
            dispatch(action.addItemRequest(data))
        },
        putItemRequest:(id,data)=>{
            dispatch(action.putItemRequest(id,data))
        },
        deleteItemRequest:(id)=>{
            dispatch(action.deleteItemRequest(id))
        },
        searchItemRequest:(data)=>{
            dispatch(action.searchItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemContainer)
