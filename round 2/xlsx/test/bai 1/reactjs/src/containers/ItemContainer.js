
import * as actions from '../actions/itemActions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemComponent from '../components/ItemComponent'

export class ItemContainer extends Component {
    componentDidMount(){
        this.props.paginatinonExcelRequest({activePage:1})
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

const mapDispatchToProps = (dispath)=> {
    return{
        paginatinonExcelRequest:(data)=>{
            dispath(actions.paginatinonExcelRequest(data))
        },
        uploadExcelRequest:(data)=>{
            dispath(actions.uploadExcelRequest(data))
        },
        addExcelRequest:(data)=>{
            dispath(actions.addExcelRequest(data))
        },
        updateExcelRequest:(data)=>{
            dispath(actions.updateExcelRequest(data))
        },
        deleteExcelRequest:(data)=>{
            dispath(actions.deleteExcelRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
