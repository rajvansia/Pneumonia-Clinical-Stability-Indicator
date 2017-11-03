import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import PatientDem from './PatientDem.js'

const data = [{id:'SMART-9995679', mrn:"12345", age:"44", fullname:"John Van", stability: "Unstable", temp:'98', sys:"140", dia:"77", sp:"95", rr:"22"},{id:'SMART-9995679', mrn:"53126", age:"32", fullname:"Jim Jones", stability: "Stable",  temp:'96', sys:"120", dia:"80", sp:"100", rr:"13"},{id:'SMART-9995679', mrn:"54436", age:"43", fullname:"Kat Kim", stability: "Unstable",  temp:'96', sys:"124", dia:"77", sp:"99", rr:"12"},{id:'SMART-9995679', mrn:"502936", age:"57", fullname:"Mary Lin", stability: "Stable",  temp:'95', sys:"134", dia:"67", sp:"95", rr:"14"}];
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: cyan500,
    primary2Color: green700,
    primary3Color: green100,
  }
})
const styles = {

    overall: {
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        flexDirection:"column",
        // width:'50%',
    },


};

class Card extends Component {
  constructor() {
      super();
    this.state = {
      inputValue : ''
    }
    }

//dispatch a login and logut action.

  render() {

    return (
      <div style={styles.overall}>
        {data.map((patient) =>

        <PatientDem  mrn={patient.mrn} age={patient.age} fullname={patient.fullname} stability={patient.stability}  rr={patient.rr} temp={patient.temp} sp={patient.sp} dia={patient.dia} sys={patient.sys}/>

      )}


      </div>

    );
  }
}


export default Card;
