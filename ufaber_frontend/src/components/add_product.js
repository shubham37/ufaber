import React, { Component } from 'react'
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from "axios";

class AddProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      sub_categories: [],
      display: false,
      message: '',
      is_disable: true,
      is_sub_cat_disable: true,
      is_text_disable: true,
      category: "Category",
      sub_Category: " Sub Category",
      cat_selected: 0,
      sub_cat_selected: 0      
    }
  }

  getCategory() {
    axios.get(`${this.props.baseUrl}/categories/`)
    .then((data) => {
      this.setState({ 
        categories: data.data
      })
    })
    .catch(error => console.log(error.message))
  }


  chooseCategory(id) {
    var cat_name = ''
    this.state.categories.forEach(
      (category) => {
        if (Number(category.id) === Number(id)){
          cat_name = category.category_name;
          return cat_name;
        }
      }
    )
    return cat_name;
  }

  chooseSubCategory(id) {
    var cat_name = ''
    this.state.sub_categories.forEach(
      (category) => {
        if (Number(category.id) === Number(id)){
          cat_name = category.subcategory_name;
          return cat_name;
        }
      }
    )
    return cat_name;
  }

  handleCategoryClick(e) {
    const cat = this.chooseCategory(Number(e.key));
    if (cat){

      axios.get(
        `/sub_categories/${Number(e.key)}`
      ).then((data) => {
        this.setState({ 
          sub_categories: data.data,
          is_sub_cat_disable: false,
          category: cat,
          cat_selected: Number(e.key)
        })
 
      }).catch(error => console.log(error.message))
    }

  }

  handleSubCategoryClick(e) {
    const cat = this.chooseSubCategory(Number(e.key));
    this.setState({
      is_text_disable: false,
      is_disable: false,
      sub_Category: cat,
      sub_cat_selected: Number(e.key)

    })
  }


  addProduct(e) {
    const product = document.getElementById('product_input').value
    const category = this.state.cat_selected
    const sub_category = this.state.sub_cat_selected

    if (product && category && sub_category){
      axios.post(`${this.props.baseUrl}/add_products/`, {
        'product_name':product,
        'category': category,
        'sub_category': sub_category
      })
      .then((res) => {
        const ite = document.getElementById('product_input')
        ite.value = ''
        this.setState({
          display: true,
          message: res.data,
          categories: [],
          is_disable: true,
          is_sub_cat_disable: true,
          is_text_disable: true,
          cat_selected:0,
          sub_cat_selected:0,
          category: "Category",
          sub_Category: " Sub Category",
        })

      })
      .catch(error => console.log(error.message))
    }
  }

  render () {
    const category = (
      <Menu onClick={(e) => {this.handleCategoryClick(e)}}>
        {this.state.categories.map((category) => (
          <Menu.Item key={category.id} >
          {category.category_name}
          </Menu.Item>
        ))}
      </Menu>
    );

    const sub_category = (
      <Menu onClick={(e) => {this.handleSubCategoryClick(e)}}>
        {this.state.sub_categories.map((subcategory) => (
          <Menu.Item key={subcategory.id} >
          {subcategory.subcategory_name}
          </Menu.Item>
        ))}
      </Menu>
    );
  
    return (
      <div class="cad">
          <div class="card">
          <span class='name'><button onClick={(e) => {this.addProduct(e)}} disabled={this.state.is_disable} >Save</button></span>
          <span class="name">
              <input placeholder="Product Name Here" id="product_input" class='choose_product' disabled={this.state.is_text_disable} size='20' maxlength='20' />
          </span> | 
          <span class="name">  
              <Dropdown overlay={sub_category} id='choose_sub_category'>
                  <Button disabled={this.state.is_sub_cat_disable}> {this.state.sub_Category} <DownOutlined />
                  </Button>
              </Dropdown>
          </span> | 
          <span class="name"> 
              <Dropdown onClick={() => this.getCategory()} overlay={category} >
                  <Button id='choose_category'> {this.state.category} <DownOutlined />
                  </Button>
              </Dropdown>
          </span> 
          <br></br>
          </div>
          <br></br>
          {this.state.display && <h2>{this.state.message}</h2>}
      </div>
    )
  };
}

export default AddProduct
