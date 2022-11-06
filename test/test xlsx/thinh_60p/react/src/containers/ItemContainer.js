import * as actions from '../actions/itemActions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemComponent from '../components/ItemComponent'

export class ItemContainer extends Component {
    componentDidMount(){
        this.props.paginationExcelRequest({activePage:1})
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
    listPage:store.excels.listPage,
    listExcel:store.excels.listExcel,
    activePage:store.excels.activePage,
    totalPage:store.excels.totalPage,
})

const mapDispatchToProps = (dispatch)=> {
    return{
        paginationExcelRequest:(data)=>{
            dispatch(actions.paginationExcelRequest(data))
        },
        uploadExcelRequest:(data)=>{
            dispatch(actions.uploadExcelRequest(data))
        },
        addExcelRequest:(data)=>{
            dispatch(actions.addExcelRequest(data))
        },
        updateExcelRequest:(data)=>{
            dispatch(actions.updateExcelRequest(data))
        },
        deleteExcelRequest:(data)=>{
            dispatch(actions.deleteExcelRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
