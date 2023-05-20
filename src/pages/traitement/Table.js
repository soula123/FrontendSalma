import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";

export default function BasicTable({ id, refreshData }) {
  const rowsPerPageOptions = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [TB, setTB] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [detectedchange, setdetectedchange] = useState(false);
  const baseUrl =  process.env.REACT_APP_BASE_URL;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const deleteTrait = (e) => {
    const id = e.target.id;
    console.log(id)
    axios
      .delete(`${baseUrl}/Dab/deleteTrait/${id}/`)
      .then((respone) => {
        console.log(respone);
        setdetectedchange(!detectedchange);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    console.log(refreshData);
    if (typeof id === "undefined") {
    } else {
      // fetch Traitements options from Django database
      const fetchdata = async () => {
        axios
          .get(`${baseUrl}/Dab/getTraitementsTable/${id}/`)
          .then((response) => {
            const data = JSON.parse(response["data"]);
            console.log(data);
            setTB(data);
          })
          .catch((error) => console.log(error));
      };
      fetchdata();
    }
  }, [id, refreshData , detectedchange]);

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Table Name</TableCell>
              <TableCell align="right">Selected Rows</TableCell>
              <TableCell align="left">Selected Columns</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TB.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
              (row) => (
                <TableRow
                  hover
                  key={row.pk}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fields.table_name}
                  </TableCell>
                  <TableCell align="right"> {row.fields.advanced} </TableCell>

                  <TableCell style={{ width: "500px" }}>
                    <Stack spacing={1} alignItems="left">
                      <Stack
                        direction="row"
                        spacing={0}
                        display="flex"
                        flexWrap="wrap"
                      >
                        {row.fields.Columns.map((col) => (
                          <Chip
                            label={col}
                            sx={{color:"#08dbba" , borderColor:"#08dbba",":hover":{ borderColor:"#08dbba"}}}
                            
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Stack spacing={1} direction="row">
                      <Button
                        variant="contained"
                        sx={{backgroundColor:"#08dbba" ,":hover":{backgroundColor:"#00CCAA"}}}
                        id={row.pk}
                        key={row.pk}
                        onClick={(e) => deleteTrait(e)}
                      >
                        <DeleteIcon id={row.pk}></DeleteIcon>
                      </Button>
                      <Button sx={{backgroundColor:"#08dbba" ,":hover":{backgroundColor:"#00CCAA"} , color:"#fff"}}>
                        <EditIcon></EditIcon>
                      </Button>
                      <Button variant="outlined" sx={{color:"#08dbba" , borderColor:"#08dbba",":hover":{ borderColor:"#08dbba"}}}>
                        <VisibilityIcon></VisibilityIcon>
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={{
          margin: "auto",
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={TB.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
