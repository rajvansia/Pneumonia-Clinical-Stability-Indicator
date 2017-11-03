import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import NavBar from "../Components/NavBar.js"
const dataSource2 = ['SMART-9995679', 'SMART-99912345', 'SMART-1951076'];

const styles = {

          main: {
          backgroundColor: '#2196F3',
          width: '50%',
          height: '20%',
          overflow: 'hidden',
          boxShadow: '.25px .25px 5px .25px',
          borderRadius: '2px 2px 2px 2px',
          marginTop:"20px",

          zIndex: 5
      },
      header:{
              backgroundColor: '#901111', // red
              padding: '1%',
              color: '#eceff1',
              position: 'relative'
          },
    mainw: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
        alignItems: 'center',
        justifyContent: 'center',
        background:"rgba(0, 188, 212, 0.36)",
        marginLeft: "100px",
        marginRight: "100px",
        marginTop:"10px",
    },
    patientInfo: {
        fontSize:"20px",
        color:"white",
        paddingLeft:"20px"
    },
    patientStability: {
        color:"#1fff1f",
        fontSize:"30px",
        paddingLeft:"20px"
    },
    patientUnstable: {
        color:"red",
        fontSize:"30px",
        paddingLeft:"20px"
    },
    name:{

        fontSize:"30px",
        color:"white",
        background:"grey",
        paddingLeft:"30px",

    },
    vital: {

        paddingRight:"0px",
        paddingLeft:"10px",
        fontSize:"25px",
    },
    vitalVal: {

        paddingRight:"2px",
        paddingLeft:"0px",
        fontSize:"30px",
    },
    vitalArea: {
        borderTopWidth:"3px",
        borderTopStyle:"solid",
        paddingBottom:"20px",

    },

};

class PatientDem extends Component {

  constructor() {
      super();
    this.state = {
      inputValue : ''
    }
    }

//dispatch a login and logut action.

  render() {

    return (
        <div style={styles.main} className="Banner-header">
          <div className="container vitalsDash">
                   <div className="row">
                  <div className="stuff">

                          <div style={styles.name}>
                                          <span stlye={styles.patientName}>{this.props.fullname}</span>
                                          <span style={styles.patientInfo}> Age:{this.props.age} MRN:{this.props.mrn}</span>
                                          <span style={this.props.stability=="Stable" ? styles.patientStability : styles.patientUnstable} > {this.props.stability}</span>

                                        </div>

                                        <div style={styles.vitalArea}>
                                                      <span style={styles.vital}>SPO2</span>
                                                      <i class="fa fa-caret-up"></i>
                                                      <span  style={styles.vitalVal}> 98%</span>
                                                        <span style={styles.vital}> RR</span>
                                                        <span style={styles.vitalVal}> 10</span>
                                                          <span style={styles.vital}> SPO2</span>
                                                          <span  style={styles.vitalVal}> 98%</span>
                                                            <span style={styles.vital}> RR</span>
                                                            <span style={styles.vitalVal}> 10</span>
                                                      </div>


                  </div>
                </div>
                </div>
        </div>

    );
  }
}


export default PatientDem;
