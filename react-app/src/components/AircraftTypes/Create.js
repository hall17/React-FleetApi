import React,{Fragment,useState} from 'react';
import {Button,TextField} from '@material-ui/core';
import {Typography,Dialog,DialogContent,DialogTitle,DialogContentText} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actions from '../../actions/Aircraft'
import {compose} from 'redux';
import CloseIcon from '@material-ui/icons/Close'

const styles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      margin:10
    }
  },
  formControl: {
    margin:10,
    minWidth: 150,
  },
  exitbutton: {
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.contrastText
  }
}))
const initialAcType = {
    manufacturer:'',model:'',modelType:'',engine:'',
}
const Create = (props) => {
  const [open, setOpen] = useState(false)
  const [acType,setAcType] = useState(props.acType);
  const classes = styles();
    const handleToggle = () => {
      setOpen(!open)
      setAcType(initialAcType)
    }
    const handleChange = name => ({target: {value}}) => {
      setAcType({
        ...acType,
        [name]:value         
        })
    }
    const handleSubmit = () => {
      // TODO : validate    
      props.createAcType(acType)
      handleToggle()
    }
        return (
          <Fragment>
          <Button 
          startIcon={<Add />} 
          variant="outlined" color="primary" mini="true"
          onClick={handleToggle} >
          Add New Aircraft Type
          </Button>
          <Dialog 
          open={open} 
          onClose={handleToggle}
          fullWidth={true}
          maxWidth = {'md'}>
                   <DialogTitle id="form-dialog-title">
                  <div style={{display:'flex'}}>
                  <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
                  Create a New Aircraft Type
                  </Typography>
                  <Button 
                  color="secondary" text="X" onClick={handleToggle}
                  className={classes.exitbutton}
                  >
                  <CloseIcon />  
                  </Button>
                  </div>
                  </DialogTitle>           
                  <DialogContent>
                    <DialogContentText>
                      Please fill out the aircraft type info.
                    </DialogContentText>
                  <form  className={classes.root} onSubmit={handleSubmit} >
                  <TextField
                    variant="outlined"
                    margin ="normal"
                    label="Manufacturer"
                    value={acType.manufacturer}
                    onChange={handleChange('manufacturer')} />
                  <TextField 
                  label="Model"
                  variant="outlined"
                  margin ="normal"
                  value={acType.model}
                  onChange={handleChange('model')}/>                             
                    <TextField 
                  label="Model Type"
                  variant="outlined" 
                  margin ="normal"
                  value={acType.modelType}
                  onChange={handleChange('modelType')}/>
                  <TextField 
                  label="Engine"
                  variant="outlined"
                  margin ="normal" 
                  value={acType.engine}
                  onChange={handleChange('engine')}/>
                  </form>
                  </DialogContent>
                  <div style={{marginLeft:425,marginTop:50, marginBottom:70}}>
                  <Button 
                    color="primary" 
                    variant="contained"
                     onClick={handleSubmit}
                     style={{ width: '20%'}}>
                      Create
                    </Button>
                    </div>
                </Dialog>
          </Fragment>
)
    }
const mapStateToProps = state => ( {
  acType: state.getAircrafts.acType
})
const mapActionToProps = {
  createAcType: actions.createAcType
}
const enhance = compose(
  connect(mapStateToProps,mapActionToProps),
)
export default enhance(Create);