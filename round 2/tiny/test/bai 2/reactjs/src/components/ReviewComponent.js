import React, { Component } from 'react'

export default class ReviewComponent extends Component {
    render() {
        return (
            <div>
                <div style={{ width: 800 }} dangerouslySetInnerHTML={{ __html: this.props.item.content }}></div>
            </div>
        )
    }
}
