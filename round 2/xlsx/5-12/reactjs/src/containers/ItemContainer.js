
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions'
import ItemComponent from '../components/ItemComponent'
export class ItemContainer extends Component {
    componentDidMount(){
        this.props.getExcelRequet()
    }
    render() {
        return (
            <div>
                <ItemComponent {...this.props} />
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    listItem: store.items.listItem
})

const mapDispatchToProps = (dispatch)=>{
    return{
        getExcelRequet:()=>{
            dispatch(actions.getExcelRequet())
        },
        uploadExcelRequet:(data)=>{
            dispatch(actions.uploadExcelRequet(data))
        },
        addExcelRequet:(data)=>{
            dispatch(actions.addExcelRequet(data))
        },
        updateExcelRequet:(data)=>{
            dispatch(actions.updateExcelRequet(data))
        },
        deleteExcelRequet:(data)=>{
            dispatch(actions.deleteExcelRequet(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
