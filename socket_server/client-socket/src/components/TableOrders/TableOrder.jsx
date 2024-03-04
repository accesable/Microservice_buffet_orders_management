import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiHost2 from '../../utils/apiHost2';




function TableOrder() {
  const [rows, setRows] = React.useState([])
  React.useEffect(() => {
    apiHost2.get('/orders')
    .then((response) => {
      console.log(response)
      setRows(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>_id</TableCell>
          <TableCell align="right">create at</TableCell>
          <TableCell align="right">Action</TableCell>
          <TableCell align="right">end at</TableCell>
          <TableCell align="right">table id :</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
            <TableCell align="right">{row.created_at}</TableCell>
            <TableCell align="right">Add Dishes,EndTable</TableCell>
            <TableCell align="right">{row.end_at && "Not finished"}</TableCell>
            <TableCell align="right">{row.table}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default TableOrder