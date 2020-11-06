import React,{Fragment,useState,useEffect} from 'react';
import {Typography,Button,TextField,Select,FormControl,InputLabel,MenuItem} from '@material-ui/core';
import {Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actions from '../actions/Aircraft'
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
    minWidth: 180,
  },
  exitbutton: {
    backgroundColor:theme.palette.secondary.light,
    color:theme.palette.secondary.contrastText
  },
  createbutton:{  
    // width:100,
    marginLeft:400,
    width: '20%',
    }
}))
const initialAC = {
    registration:'',effectivity:'',
    model:'',modelType:'',engine:'',
    bodyNo:'',lineNo:'',serialNo:'',         
    deliveryDate:''
}
const Create = (props) => {
  const [open, setOpen] = useState(false)
  const [ac,setAc] = useState(initialAC);
  const [models,setModels] = useState([])
  const [modelTypes,setModelTypes] = useState([])
  const [engineTypes,setEngineTypes] = useState([])
  const classes = styles();

  useEffect(() => {
    props.getAcTypes()
  },[open])

    const handleToggle = () => {
      setOpen(!open)
      if(open === false) {
        setAc(initialAC)
        let temp = [];
        props.AcTypes.forEach(function(record,index){
          if(!temp.includes(record.model)) { temp.push(record.model) 
          }
      });
      setModels(temp) 
      console.log(temp)
      }

    }
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
                    if(!tempType.includes(record.modelType)) { tempType.push(record.modelType) 
                    } 
                    if(!tempEngine.includes(record.engine)) { 
                      tempEngine.push(record.engine) }  
                   });
                  }
      setModelTypes(tempType);
      setEngineTypes(tempEngine);
    }
    const handleSubmit = () => {
      // TODO : validate    
      props.createAC(ac)
      handleToggle()
    }
        return (
          <Fragment>
          <Button 
          startIcon={<Add/>} 
          variant="outlined" color="primary" mini="true"
          onClick={handleToggle} >
          Add New Aircraft
          </Button>
          <Dialog 
          open={open} 
          onClose={handleToggle}
          fullWidth={true}
          maxWidth = {'md'}>
                  <DialogTitle id="form-dialog-title">
                  <div style={{display:'flex'}}>
                  <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
                  Create a New Aircraft
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
                      Please fill out the aircraft info.
                    </DialogContentText>
                  <form  className={classes.root} onSubmit={handleSubmit} >
                  <FormControl className={classes.formControl} >
                  <InputLabel >Select Model</InputLabel>
                  <Select
                        value={ac.model}
                        onChange={handleSelectChange('model')}
                      >
                      <MenuItem key={0} value=''>Select Model</MenuItem>
                      {models.map(model =>
                        <MenuItem key={model}  value={model}>{model}</MenuItem>                          
                      )}              
                  </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} >
                  <InputLabel >Select Sub Model</InputLabel>
                  <Select
                        id="modelType"
                        value={ac.modelType}
                        onChange={handleChange('modelType')}
                      >
                      <MenuItem key={0} value=''>Select Sub Model</MenuItem>
                      {modelTypes.map(modelType =>
                        <MenuItem key={modelType} value={modelType}>{modelType}</MenuItem>

                      )}              
                  </Select>
                  </FormControl>
                  <FormControl className={classes.formControl} >
                  <InputLabel >Select Engine</InputLabel>
                  <Select
                        id="engine"
                        value={ac.engine}
                        onChange={handleChange('engine')}
                      >
                      <MenuItem value=''>Select Engine</MenuItem>
                      {engineTypes.map(engine =>
                        <MenuItem key={engine}  value={engine}>{engine}</MenuItem>

                      )}              
                  </Select>
                  </FormControl>
                  <br />
                  <TextField
                    variant="outlined"
                    margin ="normal"
                    label="Registration"
                    value={ac.registration}
                    onChange={handleChange('registration')} />
                    <TextField 
                  label="Effectivity"
                  variant="outlined"
                  margin ="normal"
                  value={ac.effectivity}
                  onChange={handleChange('effectivity')}
                  />
                  <br />              
                    <TextField 
                  label="Body Number"
                  variant="outlined" 
                  margin ="normal"
                  value={ac.bodyNo}
                  onChange={handleChange('bodyNo')}
                  />
                      <TextField 
                  label="Line Number"
                  variant="outlined"
                  margin ="normal" 
                  value={ac.lineNo}
                  onChange={handleChange('lineNo')}
                  />
                      <TextField 
                  label="Serial Number"
                  variant="outlined" 
                  margin ="normal"
                  value={ac.serialNo}
                  onChange={handleChange('serialNo')}
                  />
                  <TextField 
                  label="Delivery Year"
                  variant="outlined"
                  margin ="normal"
                  value={ac.deliveryDate}
                  onChange={handleChange('deliveryDate')}
                  />
                  </form>
                  </DialogContent>
                  <Button 
                    color="primary" 
                    variant="contained"
                     onClick={handleSubmit}
                     style={{  marginLeft:400,width: '20%'}}>
                      Create
                    </Button>
                </Dialog>
          </Fragment>
)
    }
const mapStateToProps = state => ( {
  list: state.getAircrafts.list,
  AcTypes: state.getAircrafts.listAcTypes
})
const mapActionToProps = {
  createAC: actions.create,
  getAcTypes: actions.getAcTypes
}
const enhance = compose(
  connect(mapStateToProps,mapActionToProps),
)
export default enhance(Create);