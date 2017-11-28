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



const dataSource2 = ['SMART-9995679', 'SMART-99912345', 'SMART-1951076'];

const styles = {

          main: {
          backgroundColor: 'rgb(98, 185, 255)',
          width: '60%',
          height: '20%',
          // overflow: 'hidden',
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
    buttonDel: {
        fontSize:"15px",
        zIndex:20,
        marginLeft:"97%",
        marginBottom:"0px"
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
    topBanner:{

        background:"#524b4b",


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



const PatientDem = ({ patient, onDeletePatient}) => (

        // <button style={styles.main} className="Banner-header">
          <div  style={styles.main} className="container vitalsDash">
                   <div className="row">
                  <div className="stuff">
                    <div style={styles.topBanner}>
                    <button style={styles.buttonDel} onClick={onDeletePatient.bind(this, patient.id)}>x</button>
                    </div>
                          <div style={styles.name}>

                                          <span stlye={styles.patientName}>{patient.name}</span>
                                          <span style={styles.patientInfo}> DOB: {patient.birth_date}   MRN: {patient.mrn}</span>
                                            {patient.status.stable ==="No" &&
                                                          <span style={styles.patientUnstable} > Clinically Not Stable</span>}

                                            {patient.status.stable ==="Yes" &&
                                                          <span style={styles.patientStability} > Clinically Stable</span>}
                                        </div>

                                        <div style={styles.vitalArea}>
                                          <div style={styles.vital}>
                                            <div>
                                             {Math.ceil(patient.status.systolic_bp)}/{Math.ceil(patient.status.diastolic_bp)} <span style={styles.units}> mmHg </span>
                                           </div>
                                           <div>
                                            BP
                                          </div>
                                        </div>
                                           <div style={styles.vital}>
                                             <div>
                                              {Math.ceil(patient.status.heart_rate)} <span style={styles.units}> BPM </span>
                                            </div>
                                            <div>
                                             HR
                                           </div>
                                         </div>
                                         <div style={styles.vital}>
                                           <div>
                                            {Math.ceil(patient.status.respiratory_rate)} <span style={styles.units}> BRPM </span>
                                          </div>
                                          <div>
                                           RR
                                         </div>
                                       </div>
                                            <span style={styles.vital}>
                                              <div>
                                               {Math.ceil(patient.status.temperature)} <span style={styles.units}>F</span>
                                             </div>
                                             <div>
                                              Temp
                                            </div>
                                             </span>
                                             <span style={styles.vital}>
                                               <div>
                                                {Math.ceil(patient.status.pulse_ox)}<span style={styles.units}>%</span>
                                              </div>
                                              <div>
                                               SpO2
                                             </div>
                                              </span>



                                                      </div>
                                                      <div style={styles.recomendation}>
                                                        {patient.length_of_stay ===1 &&
                                                                      <span style={styles.patientStay}>Length of Stay: {patient.length_of_stay} day </span>}
                                                        {patient.length_of_stay >1 &&
                                                                      <span style={styles.patientStay}>Length of Stay: {patient.length_of_stay} days </span>}

                                                      </div>

                  </div>
                </div>
                </div>
        // </button>
    );


  export default PatientDem;
