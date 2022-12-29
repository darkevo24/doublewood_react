import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import './customer.css';

export default class Example extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 500,
      result: '',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if(data){
      this.setState({ result: data })
        const sessionidx = sessionStorage.getItem("customer_access_token")

        fetch('http://darkevo24.pythonanywhere.com/scan_data').then( res => res.json())
        .then(data=>{
           sessionStorage.setItem('customer_access_token', data.customer_access_token);
        }).catch(err => console.log("err",err));

         fetch(`http://darkevo24.pythonanywhere.com/add_table/1`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.state.result)
        }).then( res => {
            if(res.ok){
                window.location.replace("/place_order")
            }
        })
    }
      }

  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 500,
      width: 800,
      margin: "auto"
    }

    return(
      <div>
        <QrReader
        className='qr'
          delay={this.state.delay}
          // style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
          <p style={{textAlign:"center"}}>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Result: {this.state.result}</h1>
          </p>
      </div>
    )
  }
}
 