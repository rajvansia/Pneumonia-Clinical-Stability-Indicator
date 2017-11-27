import React, { Component } from 'react';
import '../App.css';
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '../Components/Card.js'
import PatientDem from "../Components/PatientDem.js"

import { Link } from 'react-router-dom'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: green700,
    primary3Color: green100,
  }
})
const styles = {

    links: {
      size:"1px",
      color:"black",
      textDecoration:"none"
        // width:'50%',
    },


};
class NavBar extends Component {
constructor(props) {
  super(props);
  this.state = {open: false};
}
handleToggle = () => this.setState({open: !this.state.open});
handleClose = () => this.setState({open: false});

render() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
    <div>
<AppBar
title="CAP Clinical Stability Predictor "
iconElementLeft={<IconButton></IconButton>}
/>
<Drawer
       docked={false}
       width={200}
       open={this.state.open}
       onRequestChange={(open) => this.setState({open})}
       >
       <MenuItem >
          <Link style={styles.links} to='/'>Home</Link>
         </MenuItem>
         <MenuItem >
           <Link style={styles.links}  to='/PatientList'>Patient List</Link>
         </MenuItem>
          <MenuItem>
          <Link style={styles.links} to='/PatientDetail'>Patient Detail</Link>
          </MenuItem>
     </Drawer>
   </div>
 </MuiThemeProvider>
   );
 }
}

export default NavBar;
