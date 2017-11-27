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
import ProgressNotes from "../Components/ProgressNotes.js"
import { connect } from 'react-redux';



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
const PatientDetail = withRouter (({patients})=> (

      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
    <NavBar />
    {patients!=null?    <div style={styles.overall}>


        <PatientDem days={patients.days} hr={patients.hr} rec={patients.rec} mrn={patients.mrn} age={patients.age} fullname={patients.fullname} stability={patients.stability}  rr={patients.rr} temp={patients.temp} sp={patients.sp} dia={patients.dia} sys={patients.sys}/>


                <ProgressNotes />
        <header styles={styles.footer}>
          <h6 className="App-title"></h6>
        </header>

      </div>: 'laoding'}
    </div>
  </MuiThemeProvider>
    )

)
const mapStateToProps = ({ patient}) => ({

  patients:patient.patientDet,

});
export default  connect(mapStateToProps)(PatientDetail);
