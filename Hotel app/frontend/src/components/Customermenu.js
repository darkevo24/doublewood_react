import React from 'react';
import Card from './Card';
import Cart from './Cart';
import './customer.css';
import {isLoggedInCustomer} from './auth';
import Toastify from 'toastify-js'

export default class Customermenu extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        data1: [],
        food: [],
        grandtotal: 0,
        id : this.props.match.params.id
      };
      this.additem = this.additem.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
    }
    
    componentDidMount(){
      fetch("http://darkevo24.pythonanywhere.com/menu").then( res => res.json()).then(data =>{
          this.setState({data1: data.food_items})
      })
    }

    additem  = (x,i) => {
      const item = {'name':x.name,'price':x.amount,'quantity':1}
      this.setState({food: this.state.food.concat(item)})
      this.setState(prevState => {
        return {grandtotal: prevState.grandtotal + x.amount}
      })
      Toastify({
        text: "Item added to cart",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
   } 

   handleRemove = (key,i) => {
     const item = this.state.food[i].price;
     this.setState(prevState => {
       let fooditem = {...prevState.food}
       console.log(fooditem);
       fooditem[i].quantity = fooditem[i].quantity - 1;
       if(fooditem[i].quantity === 0){
           return {food: this.state.food.filter((row,j) => j!==i)}
       }
       else{
          return { fooditem }
       }
     })
     this.setState(prevState => {
       console.log(this.state.food[i].price)
       return {grandtotal: prevState.grandtotal - this.state.food[i].price}
     })
   };
  
   handleAdd = (i) => {
    this.setState(prevState => {
      let fooditem = {...prevState.food}
      fooditem[i].quantity = fooditem[i].quantity + 1;
      return {fooditem}
    })
    this.setState(prevState => {
      return {grandtotal: prevState.grandtotal + this.state.food[i].price}
    })
   };

   handleConfirm = () => {
      const sessid = sessionStorage.getItem("customer_access_token");
      const food = JSON.stringify(this.state.food);
      const grandtotal = this.state.grandtotal;
      const customerorder = {'sessionid':sessid,food,grandtotal,"tableno" : this.state.id}
      console.log(JSON.stringify(customerorder));
      fetch('http://darkevo24.pythonanywhere.com/order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customerorder)
      }).then(res => {
        console.log(res);
        if(res.ok){
          window.location.replace("/pay/" + this.state.id)
        }
      })
     };
      render(){ 
        return (
            <div className="bg2">
              <h1 style={{ color : "black",textAlign:"center" }}> Table{this.state.id}</h1>
            <div>
                <Cart
                  food={this.state.food}
                  handleAdd={this.handleAdd}
                  handleRemove={this.handleRemove}
                  grandtotal={this.state.grandtotal}
                  handleConfirm={this.handleConfirm}
                />
            </div>
            <Card 
            data={this.state.data1}
            additem={this.additem}
            />
            </div>
        )
     }   
}