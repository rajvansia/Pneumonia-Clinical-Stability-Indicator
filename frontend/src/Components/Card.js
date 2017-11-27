import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import PatientDem from './PatientDem.js'
import { Link, withRouter } from 'react-router-dom'
import {patientSelected} from '../actions/index.js';

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

const Card = ({ data}) => (

    //
    //   componentDidMount() {
    //   this.props.dispatch(patientSelected("ok"))
    // }

//dispatch a login and logut action.

    <div>

    {data? <div style={styles.overall}>
        {data.map((s) =>

        <PatientDem patient={s}/>

      )}


      </div>: 'loading ....'}
    </div>

    )

export default Card;
