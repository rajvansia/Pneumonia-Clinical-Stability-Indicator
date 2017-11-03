import React, { Component } from 'react';
import '../App.css';
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from '../Components/Card.js'
import PatientDem from "../Components/PatientDem.js"
import NavBar from "../Components/NavBar.js"

import { Link, withRouter } from 'react-router-dom'


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

    overall: {
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        flexDirection:"column",
        // width:'50%',
    },
};
const PatientDetail = withRouter (({props})=> (


      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
    <NavBar />
      <div style={styles.overall}>

        <PatientDem  mrn="9090" age="44" fullname="John Van" stability="Unstable"  rr="10" temp="99" sp="95" dia="66" sys="140"/>

        <header styles={styles.footer}>
          <h6 className="App-title"></h6>
        </header>

      </div>
    </div>
  </MuiThemeProvider>
    )
)

export default PatientDetail;
