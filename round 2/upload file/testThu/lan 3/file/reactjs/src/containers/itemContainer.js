import React, { Component } from 'react'
import { connect } from 'react-redux'
import Items from '../components/itemComponent'
import * as actions from '../actions/itemActions'
export class itemContainer extends Component {
    componentDidMount(){
        this.props.searchItemRequest({textSearch :''})
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
    listItem  : store.items.listItem
})

const mapDispatchToProps = (dispatch)=>{
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
        deteteOneImgItemRequest:(data)=>{
            dispatch(actions.deteteOneImgItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(itemContainer)
