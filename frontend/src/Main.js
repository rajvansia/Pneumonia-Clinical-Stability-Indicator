import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar'
import { connect } from 'react-redux';
import {patientSelected} from './actions/index.js';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500, pinkA200 } from 'material-ui/styles/colors';
import {green100, green500, green700} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Card from './Components/Card.js'
import PatientDem from "./Components/PatientDem.js"
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
class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {open: false};
  // }
    componentDidMount() {
    this.props.dispatch(patientSelected())
  }
  //   handleToggle = () => this.setState({open: !this.state.open});
  // handleClose = () => this.setState({open: false});

  render() {
    const {patient} = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
<NavBar />
      <div className="App">
        <Card data={patient}/>
        <header styles={styles.footer}>
          <h6 className="App-title"></h6>
        </header>

      </div>
    </div>
  </MuiThemeProvider>
    );
  }
}


const mapStateToProps = ({ patient}) => ({

  patient:patient.patients,

});

export default connect(mapStateToProps)(Main);
