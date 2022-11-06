import React, { Component } from 'react'
import { connect } from 'react-redux'
import Items from '../components/index'
import * as action from '../actions/index'
// import img from '../img/hinh-anh-dong-dep-nhat_112054113.gif'
export class Container extends Component {
    componentDidMount(){
        this.props.paginationitemRequest({activePage:1})
    }
    render() {
        return (
            // this.props.isFetching?
            // <div>
            //     <img src={img}/>
            // </div>:<Items {...this.props}/>
            <div><Items {...this.props}/></div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem : store.items.listItem,
    activePage : store.items.activePage,
    totalPage : store.items.totalPage,
    textSearch : store.items.textSearch,
    isFetching : store.items.isFetching,
})

const mapDispatchToProps = (dispatch)=>{
    return{
        paginationitemRequest:(data)=>{
            dispatch(action.paginationitemRequest(data))
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)
