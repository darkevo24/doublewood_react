import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import {deleteTokens} from './auth';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

const logout = (e) => {
    e.preventDefault();
    deleteTokens();
    window.location.replace('/');
 }

 const homepage = () => {
  window.location.replace("/main")
}

const menupage = () => {
  window.location.replace("/menu");
}

// const paymentpage = () => {
//   window.location.replace("/payment")
// }

const additem = () => {
  window.location.replace("/add")
}


 

export default function ClippedDrawer(props) {
  const classes = useStyles();
  const [name , setName] = useState("");
  const [id , setId] = useState(0);
  const [description , setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState();
  const [type,setType] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("file",image);
    formdata.append("id",id);
    formdata.append("name",name);
    formdata.append("description",description);
    formdata.append("amount",amount);
  //   for (var pair of formdata.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }
    // const data = { id, name, description, amount }
    fetch('http://darkevo24.pythonanywhere.com/menu_create', {
     method: "POST",
     body: formdata
   }).then( res => {
       if(res.ok){
          alert("success")
       }
       return res.json();
   })
   .then(res => console.log(res))
 };

 const HandleFile = (e) => {
  let file = e.target.files[0];
  setImage(file);
 }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Hotel App
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
        <ListItem button>
          <ListItemText primary="Order" onClick={homepage} />
        </ListItem>
        <ListItem button onClick={handleClick}>
        <ListItemText primary="Menu" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
            <ListItemText primary="Menu List" onClick={menupage} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Add Item" onClick={additem} />
          </ListItem>
         </List>
         </Collapse>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div component={Paper}>
          <Container maxWidth="sm">
               
                    <h1>Add Item</h1>
                        <TextField
                            placeholder="Enter Id of Item"
                            label="Item Id"
                            value={id}
                            onChange={event => setId(event.target.value)}
                            variant="outlined"
                            fullWidth="true"
                            margin="normal"
                        /> 
                        <br />
                        <TextField
                            placeholder="Enter Name of Item"
                            label="Name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth="true"
                        />
                        <br />
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Type</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Type"
                            onChange={(event) => setType(event.target.value)}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                        <br></br>
                        <TextField
                            placeholder="Enter Description"
                            label="Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth="true"
                        />
                        <br />
                        <TextField
                            placeholder="Enter Price"
                            label="Amount"
                            value={amount}
                            onChange={event => setAmount(event.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth="true"
                        />
                        <br />
                        <input onChange={e => HandleFile(e)} type="file" id="image" name="file" 
            accept="image/*" className="file-custom"/>
                        <br/>
                        <br/>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={onSubmit}
                        >Add Item
                        </Button>   
                   </Container>
        </div>
      </main>
    </div>
  );
}
