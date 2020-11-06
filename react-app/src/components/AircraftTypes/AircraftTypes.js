import React,{Fragment,useState,useEffect} from 'react';
import {Button} from '@material-ui/core';
import {Dialog,DialogContent,DialogTitle} from '@material-ui/core';
import {Typography,Grid,Paper,Table,TableHead,TableBody,TableRow,TableContainer,TableCell,
    ButtonGroup, TableSortLabel} from '@material-ui/core'
import {connect} from 'react-redux';
import * as actions from '../../actions/Aircraft'
import {compose} from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from './Edit'
import Create from './Create'
const styles = makeStyles((theme) => ({
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
    button: {
        maxWidth:15
    }
}))
const columns = [
    {field:'manufacturer',headerName:'Manufacturer'},
    {field:'model',headerName:'Model'},
    {field:'modelType',headerName:'Model Type'},
    {field:'engine',headerName:'Engine'},
  ];

const AircraftTypes = (props) => {
    const [open, setOpen] = useState(false)
    const [order,setOrder] = useState()
    const [orderBy,setOrderBy] = useState()
    const classes = styles()
    useEffect(() => {     
        // props.getAcTypes()
        },[props.AcTypes])
    const handleToggle = () => {
        setOpen(!open)
    }
    const handleClick = () => {
        handleToggle()
        props.getAcTypes()
    }
    const onDelete = id => {
    if(window.confirm('Are you sure you want to delete this aircraft type?'))
    props.deleteAcType(id)
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
        return stablesort(props.AcTypes,getComparator(order,orderBy))
    }
      return (
        <Fragment>
        <Button 
        variant="outlined" color="primary" mini="true"
        onClick={handleClick} >
        Aircraft Types
        </Button>
        <Dialog 
        open={open} 
        onClose={handleToggle}
        fullWidth={true}
        maxWidth = {'md'}>
                <DialogTitle>
                <div style={{display:'flex'}}>
                <Typography variant="h6" color="inherit" style={{flex:1}} gutterBottom>
                Aircraft Types
                </Typography>  
                <Create/>              
                </div>
                </DialogTitle>
                <DialogContent>
                <Paper className="classes.paper">
                <Grid container>
                    <Grid item xs ={12}>
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
                            <TableCell>{record.manufacturer}</TableCell>
                            <TableCell>{record.model}</TableCell>
                            <TableCell>{record.modelType}</TableCell>
                            <TableCell>{record.engine}</TableCell>
                            <TableCell>
                            <ButtonGroup variant="text">
                            <Edit record={record} id={record.id} />                            
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
                </DialogContent>
              </Dialog>
        </Fragment>
)
}

const mapStateToProps = state => ( {
    AcTypes: state.getAircrafts.listAcTypes

})
const mapActionToProps = {
    getAcTypes: actions.getAcTypes,
    getTypeById: actions.getTypeById,
    deleteAcType: actions.deleteAcType
}
const enhance = compose(
    connect(mapStateToProps,mapActionToProps),
)

export default enhance(AircraftTypes)