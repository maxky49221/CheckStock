import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import Popup from '../components/Popup';
import React, {useState , useEffect} from 'react';
import pandm from '../images/pandm1.png';
import axios from '../axios'
import {createData} from '../utilites/createData';
import { Link } from "react-router-dom";
import back from '../images/back.png';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  
  const [modalShow, setModalShow] = React.useState(false);

  

  const [data, setData]= useState([])
useEffect(() => {
 const fetchData=async()=>{
  const response = await axios.get('/InfoProductServlet')
  console.log(response.data);
  setData(response.data);
 }
 fetchData();
}, [])



const [dota, setDota]= useState([])
useEffect(() => {
 const fetchDota=async()=>{
  const response = await axios.get('/AddAndReServlet')
  console.log(response.dota);
  setDota(response.dota);
 }
 fetchDota();
}, [])

console.log(dota)


  return (
    
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell component="th" scope="row">
          <img className="imgtablede" src={row.img} />
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="right">{row.serial}</TableCell>

        <TableCell align="right">
          <Button className="butpm" variant="contained" onClick={() => setModalShow(true)}>
          <img className="pandm" src={pandm}/>
          </Button>
        </TableCell>
        <Popup show={modalShow} onHide={() => setModalShow(false)}id={row.id} number={row.number} serial={row.serial} img={row.img} name={row.name}/>
        
        <TableCell align="right">{row.number}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Amount was sell</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                <span className="black-example border-bottom border-dark"></span>


                  {/* {dota.map((historyRow) => (
                   <TableRow key={historyRow.time}>
                  
                      <TableCell component="th" scope="row">
                        {historyRow.time}
                      </TableCell>

                      
                      <TableCell>{historyRow.reduce}</TableCell>
                      <TableCell align="right">{historyRow.add}</TableCell>
                      <TableCell align="right">
                        {Math.round(data.number * data.price * 100) / 100}
                      </TableCell> 

                    </TableRow>      
                         
                  ))} */}
                  

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>        
      </TableRow>
      <span className="black-example border-bottom border-dark"></span>
    </React.Fragment>
    
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {








const [data, setData]= useState([])
useEffect(() => {
 const fetchData=async()=>{
  const response = await axios.get('/InfoProductServlet')
  console.log(response.data);
  setData(response.data);
 }
 fetchData();
}, [])

console.log(data)

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>Product</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="right">Serial Number</TableCell>
            <TableCell align="right">Add/Reduce</TableCell>
            <TableCell align="right">Remaining amount&nbsp;(pice)</TableCell>
            <TableCell align="right">Price&nbsp;(bath)</TableCell>
          </TableRow>
        </TableHead>
        <span className="black-example border-bottom border-dark"></span>
        <TableBody>
          {data.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
