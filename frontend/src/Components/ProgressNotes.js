import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import NavBar from "../Components/NavBar.js"
import { Link, withRouter } from 'react-router-dom'

const dataSource2 = ['SMART-9995679', 'SMART-99912345', 'SMART-1951076'];

const styles = {

          main: {
          backgroundColor: 'rgb(98, 185, 255)',
          width: '60%',
          height: '20%',
          overflow: 'hidden',
          boxShadow: '.25px .25px 5px .25px',
          borderRadius: '2px 2px 2px 2px',
          marginTop:"20px",

          zIndex: 5
      },
      header:{
              backgroundColor: '#524b4b', // red
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
    patientStay: {
        fontSize:"20px",
        color:"white",
        paddingLeft:"20px"
    },
    patientRecomend: {
        fontSize:"20px",
        color:"white",
        paddingLeft:"60px"
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

        fontSize:"20px",
        color:"white",
        paddingBottom: "10px",
        background:"#524b4b",
        paddingLeft:"30px",
        paddingRight:"30px",
        display:"flex",
        flexFlow:" row wrap",

    },
    nameT:{

        fontSize:"20px",
        color:"white",
        paddingBottom: "10px",
        background:"#524b4b",
        paddingLeft:"10px",
        paddingRight:"30px",
        display:"flex",
        flexFlow:" row wrap",

    },
    vital: {

        paddingRight:"20px",
        paddingLeft:"40px",
        fontSize:"25px",
    },
    vitalVal: {

        paddingRight:"2px",
        paddingLeft:"0px",
        fontSize:"30px",
    },
    vitalArea: {
        borderTopWidth:"3px",
        display:"flex",
        flexFlow:" row wrap",
        borderTopStyle:"solid",
        paddingBottom:"20px",

    },

  recomendation:{

      fontSize:"30px",
      color:"white",
      background:"#524b4b",
      paddingLeft:"30px",
      textAlign: "left",

  },

};

const ProgressNotes = withRouter (({history})=> (


        <button style={styles.main} className="Banner-header"    onClick={(props) => {
        history.push('/${mrn}')
      }
    }>

          <div to="/">
          <div className="container vitalsDash">
                   <div className="row">
                  <div className="stuff">
                          <div style={styles.name}>
                                          <span stlye={styles.name}>Birthday:</span>
                                          <span style={styles.nameT}> 1/3/1973</span>
                                        </div>
                                        <div style={styles.name}>
                                                        <span stlye={styles.name}>Race:</span>
                                                        <span style={styles.nameT}> White</span>

                                                      </div>
                                                      <div style={styles.name}>
                                                                      <span stlye={styles.name}>Sex:</span>
                                                                      <span style={styles.nameT}> Male</span>
                                                                    </div>
                                                                    <div style={styles.name}>
                                                                                    <span stlye={styles.name}>Emergency Contact: </span>
                                                                                    <span stlye={styles.nameT}> Tina Van</span>
                                                                                    <span style={styles.nameT}> 973-223-3214</span>

                                                                                  </div>

                                </div>
                </div>
                </div>
              </div>
        </button>

))


export default ProgressNotes;
