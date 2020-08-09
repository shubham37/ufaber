import axios from "axios";
import React, {Component} from 'react';
import Products from './components/home';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import ListHeader from './components/header'


function dynamicSort(property) {
  var sortOrder = 1;

  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }

  return function (a,b) {
      if(sortOrder === -1){
          return b[property].localeCompare(a[property]);
      }else{
          return a[property].localeCompare(b[property]);
      }        
  }
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      products: [],
      showAddBlock: false,
      addButtonText: "Add Product",
      baseUrl: 'http://localhost:8000/api',
      order: 0
    }

    this.changeProductOrder = this.changeProductOrder.bind(this)
    this.changeSubCategoryOrder = this.changeSubCategoryOrder.bind(this)
    this.changeCategoryOrder = this.changeCategoryOrder.bind(this)    
  }

  componentDidMount() {
    this.getData();

    setInterval(this.getData, 100)
  }
  
  getData = () => {
    axios.get(`${this.state.baseUrl}/product_list/`)
    .then((data) => {
      var Cats = data.data
      var prop = ''
      switch (this.state.order) {
        case -1:
          prop = "-product_name";
          break;
        case 1:
          prop = "product_name";
          break;
        case -2:
           prop = "-subcategory_name";
          break;
        case 2:
          prop = "subcategory_name";
          break;
        case -3:
          prop = "-category_name";
          break;
        case 3:
          prop = "category_name";
          break;
      }
      if (prop !== ''){
        Cats.sort(dynamicSort(prop));
      }      
      this.setState({ products: Cats })
    })
    .catch(error => console.log(error.message))
  }

  showAddBlock() {
    if (this.state.showAddBlock){
        this.setState({
          'showAddBlock': false,
          'addButtonText': "Add Product"
        })
    }
    else{
      this.setState({
        'showAddBlock': true,
        'addButtonText': "Close"
      })
    }
  }

  changeProductOrder() {
    if (this.state.order === 0 ||  this.state.order === 1 || this.state.order !== -1){
      this.setState({
        order: -1
      })  
    }
    else{
      this.setState({
        order: 1
      })  
    }
  }

  changeCategoryOrder() {
    if (this.state.order === 0 ||  this.state.order === 3 || this.state.order !== -3){
      this.setState({
        order: -3
      })  
    }
    else{
      this.setState({
        order: 3
      })  
    }
  }

  changeSubCategoryOrder() {
    if (this.state.order === 0 ||  this.state.order === 2 || this.state.order !== -2){
      this.setState({
        order: -2
      })  
    }
    else{
      this.setState({
        order: 2
      })  
    }
  }

  render () {
    return (
      <div class='main'>
        <br></br>
        <Button type="primary" class='addButton' onClick={() => this.showAddBlock()} >{this.state.addButtonText}</Button>

        <div class='products'>
          <ListHeader changeProductOrder={this.changeProductOrder} changeCategoryOrder={this.changeCategoryOrder} changeSubCategoryOrder={this.changeSubCategoryOrder}/>

          <Products products={this.state.products} showAddBlock={this.state.showAddBlock} baseUrl={this.state.baseUrl} />
        </div>
      </div>
    )
  };
}

export default App;

// echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p