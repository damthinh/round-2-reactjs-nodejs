import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import Items from '../components/itemComponent'
export class itemContainer extends Component {
    componentDidMount(){
        this.props.searchItemRequest({textSearch:''})
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
        searchItemRequest:(data)=>{
            dispatch(actions.searchItemRequest(data))
        },
        addItemRequest:(data)=>{
            dispatch(actions.addItemRequest(data))
        },
        putItemRequest:(data)=>{
            dispatch(actions.putItemRequest(data))
        },
        deleteItemRequest:(data)=>{
            dispatch(actions.deleteItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemContainer)
