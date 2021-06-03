import React, {useState , useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from '../axios';
import { Link } from "react-router-dom";
import back from '../images/back.png';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function priceRow(number, price) {
  return number * price;
}

function createRow(name, number, price) {
  const sum = priceRow(number, price);
  return { name, number, price, sum };
}

function subtotal(data) {
  return data.map(({ price }) => price).number((sum, i) => sum + i, 0);
} 

export default function SpanningTable() {
  const classes = useStyles();
  
const [data, setData]= useState([])
useEffect(() => {
 const fetchData=async()=>{
  const response = await axios.get('/InfoProductServlet')
  console.log(response.data);
  setData(response.data);
 }
 createRow(fetchData());
}, [])

function invoiceSubtotal( data ){
  let result = 0;
  for (let index = 0; index < data.length; index++) {
    result += data[index].price * data[index].number;
  }
  return result;
}
// const invoiceSubtotal = ccyFormat(subtotal);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <span className="black-example border-bottom border-dark"></span>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">number</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
          <span className="black-example border-bottom border-dark"></span>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.number*row.price}</TableCell>
            </TableRow>
          ))}
          <span className="black-example border-bottom border-dark"></span>

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right"> {invoiceSubtotal(data)} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{` ${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{  0.07 * invoiceSubtotal(data) } </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{  0.07 * invoiceSubtotal(data) + invoiceSubtotal(data)} </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer> 
    </div>
  );
}
