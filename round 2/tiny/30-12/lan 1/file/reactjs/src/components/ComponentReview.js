import React, { Component } from 'react';

class ComponentReview extends Component {
    render() {
        return (
            <div>
                
                <div>{this.props.item.title}</div>
                <div style={{ width: 500 }} dangerouslySetInnerHTML={{ __html: this.props.item.content}}></div>
            </div>
        );
    }
}

export default ComponentReview;