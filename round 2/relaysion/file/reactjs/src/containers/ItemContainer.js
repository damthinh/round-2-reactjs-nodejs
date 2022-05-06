import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/itemActions' 
import ItemComponent from '../components/ItemComponent'
export class ItemContainer extends Component {
    componentDidMount(){
        this.props.getAllRequest()
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
    listGV:store.items.listGV,
    listHS:store.items.listHS,
})

const mapDispatchToProps = (dispatch)=> {
    return{
        getAllRequest:()=>{
            dispatch(actions.getAllRequest())
        },
        addGVRequest:(data)=>{
            dispatch(actions.addGVRequest(data))
        },
        updateGVRequest:(data)=>{
            dispatch(actions.updateGVRequest(data))
        },
        deleteGVRequest:(data)=>{
            dispatch(actions.deleteGVRequest(data))
        },
        deleteOneHSOfGVRequest:(data)=>{
            dispatch(actions.deleteOneHSOfGVRequest(data))
        },

        // HS
        
        addHSRequest:(data)=>{
            dispatch(actions.addHSRequest(data))
        },
        updateHSRequest:(data)=>{
            dispatch(actions.updateHSRequest(data))
        },
        deleteHSRequest:(data)=>{
            dispatch(actions.deleteHSRequest(data))
        },
        deleteOneGVOfHSRequest:(data)=>{
            dispatch(actions.deleteOneGVOfHSRequest(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
