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
import {patientSelected} from '../actions/index.js';
import PatientDetailButton from "../Components/PatientDetailButton.js"



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

        fontSize:"30px",
        color:"white",
        background:"#524b4b",
        paddingLeft:"30px",

    },
    vital: {

        paddingRight:"15px",
        paddingLeft:"35px",
        fontSize:"25px",
    },
    units: {
        fontSize:"20px",
    },
    vitalVal: {

        paddingRight:"2px",
        paddingLeft:"0px",
        fontSize:"30px",
    },
    links: {
      all: "unset",
      marginLeft: "0px",
      paddingLeft: "555px",
      width: "100%",
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



const PatientDem = ({ patient}) => (

        <button style={styles.main} className="Banner-header">
          <div className="container vitalsDash">
                   <div className="row">
                  <div className="stuff">
                          <div style={styles.name}>
                                          <span stlye={styles.patientName}>{patient.name}</span>
                                          <span style={styles.patientInfo}> Age:{patient.birth_date} MRN:23432</span>
                                          <span style={"Clinically Stable"=="Clinically Stable" ? styles.patientStability : styles.patientUnstable} > Clinically Stable</span>

                                        </div>

                                        <div style={styles.vitalArea}>
                                          <div style={styles.vital}>
                                            <div>
                                             {patient.systolic_bp}/122 <span style={styles.units}> mmHg </span>
                                           </div>
                                           <div>
                                            BP
                                          </div>
                                        </div>
                                           <div style={styles.vital}>
                                             <div>
                                              {patient.heart_rate} <span style={styles.units}> BPM </span>
                                            </div>
                                            <div>
                                             HR
                                           </div>
                                         </div>
                                         <div style={styles.vital}>
                                           <div>
                                            {patient.respiratory_rate} <span style={styles.units}> BRPM </span>
                                          </div>
                                          <div>
                                           RR
                                         </div>
                                       </div>
                                            <span style={styles.vital}>
                                              <div>
                                               {patient.temperature} <span style={styles.units}>F</span>
                                             </div>
                                             <div>
                                              Temp
                                            </div>
                                             </span>
                                             <span style={styles.vital}>
                                               <div>
                                                {patient.pulse_ox}<span style={styles.units}>%</span>
                                              </div>
                                              <div>
                                               SpO2
                                             </div>
                                              </span>



                                                      </div>
                                                      <div style={styles.recomendation}>
                                                                      <span style={styles.patientStay}>Length of Stay: {patient.days} days </span>
                                                                        <span style={styles.patientRecomend}>Recommendation: {patient.rec} </span>

                                                      </div>

                  </div>
                </div>
                </div>
        </button>
    );


  export default PatientDem;
