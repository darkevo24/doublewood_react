import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './customer.css';
import Toastify from 'toastify-js'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    width : "50%",
    margin: "auto",
    marginTop:100,
    borderRadius: "1rem",
    boxShadow: '10px 10px black',
    "@media (max-width: 600px)": {
      width : "80%",
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



export default function SimpleCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const [data1, setData] = React.useState([]);
  const [name, setName] = React.useState("");
  const [number,setNumber] = React.useState(0);
  const [nameError, setNameerror] = React.useState("");
  const [numberError, setNumbererror] = React.useState("");
  const [toggle, setToggle] = React.useState(false);
  const id = sessionStorage.getItem("id");
  
  useEffect(() => {
    fetch("http://darkevo24.pythonanywhere.com/getpayment",{
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({'tableno':id})
    }).then( res => res.json()).then(data =>{
        setData(data.customer_details)
    })
  },[]);

  const validate = () => {
    let namet = "";
    let numbert = "";
    if (!name) {
        namet="Field Empty"
    }

    if(!number){
        numbert="Field Empty"
    }

    if (namet || numbert) {
        setNameerror(namet);
        setNumbererror(numbert);
        setToggle(true);
      return false;
    }

    return true;
};

const handleClick = () => {
   if(validate()){
      window.location.replace("/checkout/" + id)
   }
   else{
   }
}

const handleCancel = () => {
  const sessid = sessionStorage.getItem("customer_access_token");
  fetch("http://darkevo24.pythonanywhere.com/order_cancel",{
    method: "POST",
    headers: {
    "Content-Type": "application/json"
    },
    body: JSON.stringify({'sessionid':sessid,'orderid':data1.orderid,"tableno" : id})
  }).then(res => {
    if(res.ok){
      Toastify({
        text: "Order cancelled",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      window.location.replace("/place_order/" + id)
    }
  })
}

  return (
      <div className="bg3">
    <Card className={classes.card}>
      <CardContent>
      <button style={{display:"block", margin: "auto" ,backgroundColor:'red',color:"white",borderRadius:10,fontSize:"16px",marginBottom: "20px", height: "40px",width: 200,cursor:"pointer"}} onClick={() => handleCancel()}>Cancel Order</button>
        <Typography variant="h5" component="h2">
            {/* {data1.name} */}
        </Typography>
        <Typography variant="body2" component="p">
          Order Id: {data1.orderid}
          <br/>
          Table No: {data1.tableno}
          <br/>
          Subtotal: Rm {data1.amount} 
          <br/>
        </Typography>
        <div>
                <TextField
                    placeholder="Enter Card Holder Name"
                    label="Name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    error={toggle}
                    helperText={nameError}
                    variant="outlined"
                    margin="normal"
                    fullWidth="true"
                />
                <br />
                <TextField
                    placeholder="Enter Card Number"
                    label="Card Number"
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    error={toggle}
                    helperText={numberError}
                    variant="outlined"
                    margin="normal"
                    fullWidth="true"
                />
                <br />
        </div> 
      </CardContent>
      <CardActions>
      <button pointer="cursor" style={{cursor:"pointer",display:"block", width: "100%", backgroundColor:'#4681f4',borderRadius:10,color:"white", padding:" 15px 32px",fontSize:"16px", pointer:"cursor", marginBottom: "20px"}} onClick={() => handleClick()}>Pay</button>
      </CardActions>
    </Card>
    </div>
  );
}