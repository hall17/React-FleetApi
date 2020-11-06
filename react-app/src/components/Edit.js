import React,{Fragment,useState,useEffect } from 'react';
import {Button,TextField,Select,FormControl,InputLabel,MenuItem} from '@material-ui/core';
import {Typography,Dialog,DialogContent,DialogTitle} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actions from '../actions/Aircraft'
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
    minWidth: 180,
  },
  exitbutton: {
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.contrastText
  }
}));
const Edit = (props) => {
    const [open,setOpen] = useState(false);
    const [ac,setAc] = useState(props.ac);
    const classes = styles();
    const [models,setModels] = useState([])
    const [modelTypes,setModelTypes] = useState([])
    const [engineTypes,setEngineTypes] = useState([])

    useEffect(() => {
      if(open === true) {
      props.getAcTypes()
    }
    },[open])
    const handleChange = name => ({target: {value}}) => {
        setAc({
                ...ac,
                [name]:value         
        })
      }  
    const handleSelectChange = name => ({target: {value}}) => {
        setAc({
          ...ac,
          [name]:value         
          })
        let tempType = []
        let tempEngine = []
        console.log(value)
        if(value === '') {
          props.AcTypes.forEach(function(record,index){
            if(!tempType.includes(record.modelType)) { tempType.push(record.modelType) 
            } 
            if(!tempEngine.includes(record.engine)) { 
              tempEngine.push(record.engine) }
            });
        }
        else {
          props.AcTypes.filter(type => type.model === value)
                       .forEach(function(record,index){
                        if(!tempType.includes(record.modelType)) 
                        { 
                          tempType.push(record.modelType) 
                        } 
                        if(!tempEngine.includes(record.engine)) 
                        { 
                          tempEngine.push(record.engine) 
                        }  
                       });
              }
        setAc({
          ...ac,
          ['modelType']:'',      
          ['engine']:''  
          })
        handleChange('modelType')
        handleChange('engine')
        setModelTypes(tempType);
        setEngineTypes(tempEngine);
      } 
      const handleClick = () => {
          setOpen(true)
          setAc(props.record)
          let temp = [];
          let tempType = []
          let tempEngine = []
          props.AcTypes.forEach(function(record,index){
          if(!temp.includes(record.model)) { temp.push(record.model) 
            }
          });
          props.AcTypes.filter(type => type.model === props.record.model)
                       .forEach(function(record,index){
                        if(!tempType.includes(record.modelType)) { tempType.push(record.modelType) 
                        } 
                        if(!tempEngine.includes(record.engine)) { 
                          tempEngine.push(record.engine) }  
                       });
        setModels(temp) 
        setModelTypes(tempType);
        setEngineTypes(tempEngine);
        console.log(temp)
      }
    const handleSubmit =  () => {
      // TODO : validate    
        props.changeupdated()
         props.updateAC(ac)
         setOpen(false)       
    }
        return (
          <Fragment>
          <Button > <EditIcon color="primary" onClick={handleClick} />
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)} 
                  fullWidth={true}
                  maxWidth = {'md'} >
                  <DialogTitle id="form-dialog-title">
                  <div style={{display:'flex'}}>
                  <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
                  Edit Aircraft
                  </Typography>
                  <Button 
                  color="secondary" text="X" onClick={() => setOpen(false)}
                  className={classes.exitbutton}
                  >
                  <CloseIcon />  
                  </Button>
                  </div>
                  </DialogTitle>         
                  <DialogContent>
                  <form className={classes.root} >
                  <FormControl className={classes.formControl} >
                  <InputLabel>Select Model</InputLabel>
                  <Select
                        defaultValue={ac.model}
                        value={ac.model}
                        onChange={handleSelectChange('model')}
                      >
                      <MenuItem value=''>Select Model</MenuItem>
                      {models.map(model =>
                        <MenuItem key={model}  value={model}>{model}</MenuItem>
                           
                      )}              
                  </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} >
                  <InputLabel>Select Sub Model</InputLabel>
                  <Select
                        defaultValue={ac.modelType}
                        value={ac.modelType}
                        onChange={handleChange('modelType')}
                      >
                      <MenuItem value=''>Select Sub Model</MenuItem>
                      {modelTypes.map(model =>
                        <MenuItem key={model}  value={model}>{model}</MenuItem>

                      )}              
                  </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} >
                  <InputLabel>Select Engine</InputLabel>
                  <Select
                        defaultValue={ac.engine}
                        value={ac.engine}
                        onChange={handleChange('engine')}
                      >
                      <MenuItem value=''>Select Engine</MenuItem>
                      {engineTypes.map(model =>
                        <MenuItem key={model}  value={model}>{model}</MenuItem>

                      )}              
                  </Select>
                  </FormControl>
                  <br />
                  <TextField
                    variant="outlined"
                    margin ="normal"
                    label="Registration"
                    defaultValue={ac.registration}
                    value={ac.registration}
                    onChange={handleChange('registration')} />
                    <TextField 
                  label="Effectivity"
                  variant="outlined"
                  margin ="normal"
                  defaultValue={ac.effectivity}
                  value={ac.effectivity}
                  onChange={handleChange('effectivity')}
                  />
                  <br />              
                    <TextField 
                  label="Body Number"
                  variant="outlined" 
                  margin ="normal"
                  defaultValue={ac.bodyNo}
                  value={ac.bodyNo}
                  onChange={handleChange('bodyNo')}
                  />
                      <TextField 
                  label="Line Number"
                  variant="outlined"
                  margin ="normal" 
                  defaultValue={ac.lineNo}
                  value={ac.lineNo}
                  onChange={handleChange('lineNo')}
                  />
                      <TextField 
                  label="Serial Number"
                  variant="outlined" 
                  margin ="normal"
                  defaultValue={ac.serialNo}
                  value={ac.serialNo}
                  onChange={handleChange('serialNo')}
                  />
                  <TextField 
                  label="Delivery Year"
                  variant="outlined"
                  margin ="normal"
                  defaultValue={ac.deliveryDate}
                  value={ac.deliveryDate}
                  onChange={handleChange('deliveryDate')}
                  />
                  </form>
                  </DialogContent>
                  <div style={{  marginLeft:350, marginTop:30, marginBottom:50}}>
                  <Button 
                    color="primary" 
                    variant="contained"
                     onClick={handleSubmit}
                     value={props.updated}
                     style={{width: '20%'}}>
                      Edit
                    </Button>
                    <Button
                    color="secondary" 
                    variant="contained"
                    onClick={() => setOpen(false)}
                    style={{width: '20%'}}> 
                      Cancel
                    </Button>
                    </div>
                </Dialog>
          </Fragment>
)
    }
const mapStateToProps = state => ( {
    ac: state.getAircrafts.ac,
    AircraftList: state.getAircrafts.list,
    AcTypes: state.getAircrafts.listAcTypes

})
const mapActionToProps = {
    updateAC: actions.update,
    getAcTypes: actions.getAcTypes
}
const enhance = compose(
  connect(mapStateToProps,mapActionToProps)
)
export default enhance(Edit);