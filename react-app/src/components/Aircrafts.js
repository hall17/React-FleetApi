import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../index.css'
import * as actions from '../actions/Aircraft'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Grid,Paper,Table,TableHead,TableBody,TableRow,TableContainer,TableCell,
        Button,ButtonGroup, TableSortLabel} from '@material-ui/core'
import {Select,FormControl,InputLabel,MenuItem,Typography} from '@material-ui/core';
import {useDeepCompareEffect,useDeepCompareEffectNoCheck} from 'use-deep-compare-effect'

import DeleteIcon from '@material-ui/icons/Delete';
import Edit from './Edit'

const styles = makeStyles((theme)  => ({
    root:{
        "& .MuiTableCell-head": {
            color: theme.palette.common.red,
            backgroundColor: theme.palette.common.gray,
            fontWeight: 'fontWeightBold'
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    formControl: {
        margin:10,
        minWidth: 120,
      },
}))
const columns = [
    {field:'registration',headerName:'Registration'},
    {field:'model',headerName:'Model'},
    {field:'modelType',headerName:'Model Type'},
    {field:'effectivity',headerName:'Effectivity'},
    {field:'bodyNo',headerName:'Body Number'},
    {field:'lineNo',headerName:'Line Number'},
    {field:'serialNo',headerName:'Serial Number'},
    {field:'engine',headerName:'Engine'},
  ];
const Aircrafts = (props) => {
    const [order,setOrder] = useState()
    const [orderBy,setOrderBy] = useState()
    const [updated,setUpdated] = useState(false)
    const [list,setList] = useState(props.AircraftList)
    const classes = styles();

    useEffect (() => {
        props.getAllAircrafts()
        if(updated === true) {
            props.getAllAircrafts()
            setUpdated(false)
        }  
    },[updated])

    const changeupdated = () => {
        setUpdated(true)      
    }
    const onDelete = id => {
        if(window.confirm('Are you sure you want to delete this aircraft?'))
        props.deleteAC(id)
    }
    const handleSort = (columnName) => {
        const isAsc = orderBy === columnName && order === "asc";
        setOrder(isAsc?'desc':'asc')
        setOrderBy(columnName)
    }   
    function stablesort(array,comparator) {
        const data =  array.map((el,index) => [el,index]);
        data.sort((a,b) => {
        const order = comparator(a[0],b[0]);
        if(order !== 0) return order;
        return a[1] - b[1];
    });
    return data.map((el) => el[0]);
}
 
    function descendingComparator(a,b,orderBy) {
        if(b[orderBy] < a[orderBy]) {
            return -1;
        }
        if(b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    
    function getComparator(order,orderBy) {
        return order === 'desc'
        ? (a,b) => descendingComparator(a,b,orderBy)
        : (a,b) => -descendingComparator(a,b,orderBy);
    }
    const sortACList = () => {
        return stablesort(props.AircraftList,getComparator(order,orderBy))
    }

    return (       
    <Paper className="classes.paper">
        <Grid container>
            <Grid item xs ={12}>
            <div style={{display:'flex'}}>
            <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom/>
            <div key={props.AircraftList} > 
                <FormControl className={classes.formControl} >
                  <InputLabel shrink id="label" >Filter By</InputLabel>
                  <Select>
                      <MenuItem key='model' value='model'>Model</MenuItem>
                  </Select>
                  </FormControl>
                  </div>              
            </div>

            <TableContainer>
                <Table>
                    <TableHead className={classes.root}>
                        <TableRow key = {0}>
                        {columns.map((column) => (
                            <TableCell key={column.field}>
                            <TableSortLabel
                            active={orderBy === column.field}
                            direction={orderBy === column.field?order:'asc'}
                            onClick={() => handleSort(column.field)}>
                            {column.headerName}
                            </TableSortLabel>
                            </TableCell>
                            ))}
                        <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody> 
                    {
                        sortACList().map((record,index) => {
                            return(<TableRow key={record.id} hover>
                                <TableCell>{record.registration}</TableCell>
                                <TableCell>{record.model}</TableCell>
                                <TableCell>{record.modelType}</TableCell>
                                <TableCell>{record.effectivity}</TableCell>
                                <TableCell>{record.bodyNo}</TableCell>
                                <TableCell>{record.lineNo}</TableCell>
                                <TableCell>{record.serialNo}</TableCell>
                                <TableCell>{record.engine}</TableCell>
                                <TableCell>
                                <ButtonGroup variant="text">
                                <Edit record={record} changeupdated={changeupdated} id={record.id} />                            
                                <Button 
                                startIcon={<DeleteIcon />} color="secondary"
                                onClick={() => onDelete(record.id)}   
                                />
                                </ButtonGroup>
                                </TableCell>                   
                            </TableRow>)
                        })
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
    
        </Grid>
    </Paper>
    );
}


const mapStateToProps = state => ( {
    AircraftList: state.getAircrafts.list,
})
const mapActionToProps = {
    getAllAircrafts: actions.getAll,
    getById: actions.getById,
    deleteAC: actions.Delete,
}
const enhance = compose(
    connect(mapStateToProps,mapActionToProps),
)
export default enhance(Aircrafts);
