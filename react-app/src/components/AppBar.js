import React from 'react';
import Create from './Create'
import { makeStyles } from '@material-ui/core/styles';
import AircraftTypes from './AircraftTypes/AircraftTypes'
import Logo from '../thy.png'
import { AppBar,Toolbar,Typography } from '@material-ui/core';
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core';
import {Aircrafts,AcTypes} from '../../src/store'
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../src/actions/Aircraft'

const styles = makeStyles((theme)  => ({
  root:{
    '& > *': {
    margin: theme.spacing(1) 
  }
  }
}))
const Appbar = (props) => {
  const classes = styles();
  const handleClick = () => {
    Aircrafts.filter(aircrafts => !props.list.find(ac => aircrafts.registration === ac.registration) ).
    forEach(function(record,index) {
      props.createAC(record)
    });
    AcTypes.filter(type => !props.listTypes.find(t => type.modelType === t.modelType) )
    .forEach(function(record,index) {
      props.createAcType(record)
    });
  }
  return(
    <AppBar position="static" color="default">
        <Toolbar variant="dense" className={classes.root}>
        <Link to="/Aircraft">
        <img src={Logo} alt="logo"/>
        </Link>
        <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
        THY Fleet Portal
      </Typography>
      <div  className={classes.root}>
      <Button variant="outlined" color="primary" mini="true"
          onClick={handleClick}>
          Initial Load</Button>
      <AircraftTypes/>
      <Create/>
      </div>
        </Toolbar>
      </AppBar>
      )
}

const mapStateToProps = state => ( {
  list: state.getAircrafts.list,
  listTypes: state.getAircrafts.listAcTypes 
})
const mapActionToProps = {
  createAC: actions.create,
  createAcType: actions.createAcType
}
const enhance = compose(
  connect(mapStateToProps,mapActionToProps),
)

export default enhance(Appbar)