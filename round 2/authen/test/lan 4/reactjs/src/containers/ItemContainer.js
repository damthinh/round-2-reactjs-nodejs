import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import ItemComponentAdmin from '../components/ItemComponentAdmin'
import ItemComponentUser from '../components/ItemComponentUser'

export class ItemContainer extends Component {
    componentDidMount() {
        this.props.getItemRequest()
    }
    render() {
        return (
            localStorage.getItem('role')==='1' ?
                <div>
                    <ItemComponentAdmin {...this.props} />
                </div> : <div>
                    <ItemComponentUser {...this.props} />
                </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem: store.items.listItem
})

const mapDispatchToProps = (dispatch) => {
    return {
        getItemRequest: () => {
            dispatch(actions.getItemRequest())
        },
        addItemRequest: (data) => {
            dispatch(actions.addItemRequest(data))
        },
        updateItemRequest: (data) => {
            dispatch(actions.updateItemRequest(data))
        },
        deleteItemRequest: (data) => {
            dispatch(actions.deleteItemRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
