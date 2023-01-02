import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute';
// import { PrivateRouteCustomer } from './components/PrivateRouteCustomer';
import Registerform  from './components/Registerform';
import Loginform from './components/Loginform';
import Main from './components/Main';
import Menumanagement from './components/Menumanagement';
import Additem from './components/Additem';
import Updateitem from './components/Updateitem';
import Customerform from './components/Customer_details';
import {isLoggedInManager} from './components/auth';
// import {isLoggedInCustomer} from './components/auth';
// import Example from './components/QRscanner';
import Customermenu from './components/Customermenu';
import Checkout from './components/Checkout';
import Pay from './components/Pay';
// import Home from './components/Home';
import Card from './components/Card-otp';
import QRCode from './components/QRCode';
import modal from './components/Modal';

class App extends Component {
  
  render() {
    return (
          <BrowserRouter>
           <Switch>
             <Route exact path="/" component={QRCode} />
             <Route exact path="/register" component={Registerform} />
             <Route exact path="/login" component={Loginform} />
             <PrivateRoute exact isloggedin={isLoggedInManager()} path="/main" component={Main} />
             <PrivateRoute exact path="/menu" component={Menumanagement} />
             <PrivateRoute exact path="/add" component={Additem} />
             <PrivateRoute exact path="/update" component={Updateitem} />
             <Route exact  path="/customer" component={Customerform} />
             <Route exact  path="/otp" component={Card} />
             {/* <Route exact path="/scan" component={Example} /> */}
             {/* <Route exact path="/qr" component={QRCode} /> */}
             <Route exact path="/place_order/:id" component={Customermenu} />
             <Route exact path="/pay/:id" component={Pay} />
             <Route exact path="/modal/" component={modal} />
             <Route exact path="/checkout/:id" component={Checkout} />
           </Switch>
          </BrowserRouter>
    );
  }
}

export default App;
