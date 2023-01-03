import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './customer.css'
import Modal from 'react-modal';

const useStyles = makeStyles({
  card: {
    width:"100%",
    margin: "auto",
    // marginTop: 20,
    // marginBottom: 20,
    borderRadius: 10,
    display:"flex"
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
  CardContent : {
    width : "70%"
  }
});


export default function SimpleCard(props) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;
  const additem = props.additem;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [image,setImage] = useState();
  const [item,setItem] = useState();
  const [index,setIndex] = useState();
  const [price,setPrice] = useState();
  const [name,setName] = useState();
  const [desc,setDesc] = useState();
  const [arr,setArr] = useState();
  let count = 0
  function openModal(x,i,arr) {
    setImage(x.image);
    setItem(x);
    setIndex(i);
    setIsOpen(true);
    setPrice(x.amount);
    setName(x.name);
    setDesc(x.description);
    setArr(arr);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  Modal.setAppElement('#root');
  return (
      <div className='card'>
          {props.data.map((x,i,arr) => {
            if (x.type === "Beverage"){
              count = count + 1;
            }
            return (
              <div key={x.id}>
                {
                  (x.type == "Beverage" && count < 2) && <h2 style={{ marginLeft : 10,marginTop : 10 }}>Beverages</h2>
                }
           <Card onClick={()=> openModal(x,i,arr)} className={classes.card}>
           <CardContent className={classes.CardContent} >
             {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
               FoodItem-ID: {x.id}
             </Typography> */}
             <Typography variant="h5" component="h2">
               {x.name}
             </Typography>
             {/* <Typography variant="body2" component="p">
               {x.description}
             </Typography> */}
             <Typography className={classes.title} color="textSecondary" gutterBottom>
               Rm {x.amount}
             </Typography>
             <CardActions>
           </CardActions>
           </CardContent>
           <div style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"center" }}>
           <img style={{ width:70 }} className='image' src={`data:;base64,${x.image}`}></img>
           </div>
         </Card>
         </div>
          )})} 
        <div style={{ display : 'flex',flexDirection : "column" }}>
           <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{ position : "relative" }}
      >
        <button style={{ width:70,height : 30,padding : 5 }} onClick={closeModal}>back</button>
        <img style={{ width:"100%" }} className='image' src={`data:;base64,${image}`}></img>
        <div>
        <div style={{ display : "flex",alignItems : "center",width : "100%",position:"relative" }}>
          <h2 style={{ width : 150 }}>{name}</h2>
        <p style={{ textAlign : "right",position:"absolute",right:0,fontSize:16 }}>Rm {price}</p>   
        </div>
        <p>{desc}</p>
        </div>
        <div style={{ marginBottom : 20,width : '80%',position:"absolute",bottom : 0,display : "flex",justifyContent : 'center',alignItems : 'center',flexDirection:"column" }}>
        <Button variant="outlined" style={{backgroundColor:"#ff9419",color : "white",width : 100,height : 30}} onClick={() => additem(item,index,arr)}>Add</Button>
        </div>
      </Modal>
      </div>
      </div>
  );
}