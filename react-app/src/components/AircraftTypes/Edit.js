import React,{Fragment,useState} from 'react';
import {Button,TextField} from '@material-ui/core';
import {Typography,Dialog,DialogContent,DialogContentText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actions from '../../actions/Aircraft'
import {compose} from 'redux';
import EditIcon from '@material-ui/icons/Edit';
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
}))
const initialAcType = {
    manufacturer:'',model:'',modelType:'',engine:'',
}
const Create = (props) => {
  const [open, setOpen] = useState(false)
  const [acType,setAcType] = useState(initialAcType);
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
    const handleClick = () => {
        setOpen(true)
        setAcType(props.record)
      }
    const handleSubmit = () => {
      // TODO : validate    
      props.updateAcType(acType)
      console.log(acType)
      handleToggle()
    }
        return (
          <Fragment>
          <Button > <EditIcon color="primary" onClick={handleClick} />
          </Button>
          <Dialog 
          open={open} 
          onClose={handleToggle}
          fullWidth={true}
          maxWidth = {'md'}>
                  <div style={{display:'flex'}}>
                  <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
                  Edit Aircraft Type
                  </Typography>
                  <Button 
                  color="secondary" text="X" onClick={handleToggle}
                  className={classes.exitbutton}
                  >
                  <CloseIcon />  
                  </Button>
                  </div>
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
                  <div style={{  marginLeft:350, marginTop:30, marginBottom:50}}>
                  <Button 
                    color="primary" 
                    variant="contained"
                     onClick={handleSubmit}
                     style={{width: '20%'}}>
                      Edit
                    </Button>
                    <Button
                    color="secondary" 
                    variant="contained"
                    onClick={handleToggle}
                    style={{width: '20%'}}> 
                      Cancel
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
  updateAcType: actions.updateAcType
}
const enhance = compose(
  connect(mapStateToProps,mapActionToProps),
)
export default enhance(Create);