import React, {Component} from 'react'
import AddProduct from './add_product'
import { Button } from 'antd';
import axios from "axios";

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showDeleteButton: false,
            deleteProducts: []
        }
    }

    deleteProducts() {

        const products_ids = this.state.deleteProducts
        // Delete Api Hit
        axios.post(`${this.props.baseUrl}/add_products/`, {
            'product_ids': products_ids
        })
        .then((res) => {
    
            this.setState({
                deleteProducts: [],
                showDeleteButton: false
            })
            const items = document.getElementsByName('acs')
            for (var i = 0; i < items.length; i++) {
                items[i].checked = false;
            }
            console.log(res.message)
        })
        .catch(error => console.log(error.message))              
    }

    handleItemCheck(event) {
        const products_ids = this.state.deleteProducts
        const val = event.target.value
        if (event.target.checked) {
            products_ids.push(val)
            this.setState({
                deleteProducts: products_ids,
                showDeleteButton: true
            })
        }
        else{
            products_ids.pop(val)
            if (products_ids.length > 0) {
                this.setState({
                    deleteProducts: products_ids,
                    showDeleteButton: true
                })    
            }
            else{
                this.setState({
                    deleteProducts: [],
                    showDeleteButton: false
                })
            }
        }
    }

    render() {
        return (
            <div class="list">
                {this.props.products.map((product) => (
                    <div class="item">
                        <span class='name'>
                            <input type="checkbox" name="acs" value={product.id} onChange={(event) => this.handleItemCheck(event)} />
                        </span>
                        <span class="name">{product.product_name}</span> | 
                        <span class="name"> {product.subcategory_name} </span> | 
                        <span class="name"> {product.category_name} </span> 
                        <br></br>
                    </div>
                ))}

                <div class="add_product_block">
                    {this.props.showAddBlock && <AddProduct baseUrl={this.props.baseUrl} />}
                </div>

                <br></br>
                <div class="delete_product_button">
                    {this.state.showDeleteButton && <Button type="danger" onClick={() => this.deleteProducts()}>Delete</Button>}
                </div>
            </div>
        )
    };
}

export default Products