import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import { Switch, Route,BrowserRouter } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from './Components/Card.js'
import PatientDem from "./Components/PatientDem.js"
import Main from "./Main.js"
import NavBar from "./Components/NavBar.js"


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: green700,
    primary3Color: green100,
  }
})
const styles = {

    footer: {
      size:"1px",
      paddingTop:"3px"
        // width:'50%',
    },


};
class App extends Component {

  render() {
    return (
      <BrowserRouter>

      <Switch>
          <Route exact path='/' component={Main}/>
           <Route path='/PatientList' component={Main}/>
           <Route path='/Card' component={Card}/>
         </Switch>
       </BrowserRouter>

    );
  }
}

export default App;
