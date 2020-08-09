import React, { Component } from 'react'
import { MoreOutlined } from '@ant-design/icons';

class ListHeader extends Component {

    render () {
        return (
            <div class="List_header">
                <span class='name'></span>
                <span class="name" title="click for ordering" onClick={this.props.changeProductOrder}> Product    <MoreOutlined /></span>  
                <span class="name" title="click for ordering" onClick={this.props.changeSubCategoryOrder}> Sub Category    <MoreOutlined /></span>  
                <span class="name" title="click for ordering" onClick={this.props.changeCategoryOrder}> Category    <MoreOutlined /></span> 
                <br></br>
                <br></br>
            </div>
        )
    }
}

export default ListHeader