import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Traitement from "./Traitment";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import FormControl from "@mui/material/FormControl";
import BasicTable from "./Table";
import { Button } from "@mui/material";
import CreateModal from "./CreateTraitement";
import "./page.css";
import axios from "axios";
import SubmitModal from "./SubmitModal";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TablePagination } from "@mui/material";
import Loader from "../Env/Loader.jsx";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';



export default function TraitementTable() {
  const [traits, setTraits] = useState([]);
  const [Env, setEnv] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedTreaitementID, setTreaitementID] = useState(-1);
  const [SchemaID, setSchemaID] = useState(null);
  const [openSubmitModal, setSubmitModal] = useState(false);
  const [openAddSelectionModal, setopenAddSelectionModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [detectedchange , setdetectedchange] = useState(false);
  const [TraitementTable,setTraitementTable]=useState([])
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // State variable for selected TableRow index

  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    // fetch Traitements options from Django database
    axios
      .get(`${baseUrl}/Dab/getTraitements`)
      .then((response) => {
        const data = JSON.parse(response["data"]);
        console.log(data.length)
        setTraits(data);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${baseUrl}/api/ShowEnv`)
      .then((response) => {
        const data = JSON.parse(response["data"]);

        setEnv(data);
      })
      .catch((error) => console.log(error));
  }, [detectedchange]);

 

  useEffect(() => {
    setRefreshData(!refreshData);

    console.log(refreshData);
  }, [openAddSelectionModal]);

  const handleSelectChange = (event) => {
    setTreaitementID(event.target.value);
    const i = traits.find(
      (element) => element.pk === parseInt(event.target.value)
    );
    setSchemaID(i.fields.schema);
  };
 
  function handleSubmitModal() {
    setSubmitModal(true);
  }
  function handleAddSelectionModal() {
    setopenAddSelectionModal(true);
  }
  

  function fetchTraitement(){
    axios.get(`${baseUrl}/Dab/ShowTraitements`)
      .then((response) => {
        const data = JSON.parse(response['data']);
        console.log(data)

        setTraitementTable(data);
        
        
    })
      .catch((error) => console.log(error));
  }


  function deleteTraitId (id) {
    console.log(id)
    axios
      .delete(`${baseUrl}/Dab/deleteTraitId/${id}/`)
      .then((respone) => {
        console.log(respone);
        setdetectedchange(!detectedchange);
      })
      .catch((error) => {
        console.error(error);
      });
      fetchTraitement()
  };

  

  console.log("liste des traitements:", TraitementTable)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    // fetch traitement options from Django database
    fetchTraitement();
    

    }, [detectedchange]);

    const [showTraitementElements, setShowTraitementElements] = useState(false);

    function handleClick() {
     setTreaitementID(-1)
    }


    const[loader,setLoader]=useState(true)
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    
  function  TraitementElements (){
    return(


     
      
    <div className="box box2">
 {loader ? <Loader /> : (
  <div>
         <Paper>
        
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontSize:"15px",fontWeight:'bold'}}>Treatment Name</TableCell>
              <TableCell style={{fontSize:"15px",fontWeight:'bold'}} align="center" >Schema </TableCell>
              <TableCell style={{fontSize:"15px",fontWeight:'bold'}} align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TraitementTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
            (row) => (
              <TableRow
              hover 
              key={row.pk}

              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              
              <TableCell component="th" scope="row">
                {row.fields.name}
              </TableCell>
              <TableCell align="center"> {row.fields.schema} </TableCell>
             
                  <TableCell align="left">
                    <Stack spacing={1} direction="row">
                      <Button
                        variant="contained"
                        sx={{backgroundColor:"#08dbba" ,":hover":{backgroundColor:"#00CCAA"}}}
                        id={row.pk}
                        key={row.pk}
                        onClick={(e) => deleteTraitId(row.pk)}
                      >
                        <DeleteIcon id={row.pk}></DeleteIcon>
                      </Button>
                     
                    </Stack>
                  </TableCell>
                             
              </TableRow>

            ) )}
          </TableBody>
        </Table>
      </TableContainer>
    
      <TablePagination
        sx={{
          margin: "auto",
        }}
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={TraitementTable.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
    </Paper>
    </div>
      ) } 
    </div>
  );}


 
  
  return (
   
    
      
    <div className="contain" style={{ height: "100vh", width: "100%" }}>
      <div className="box box1">
        <FormControl variant="standard">
          <div className="Selects">
            <CreateModal />

            <select label="Traitement" onChange={handleSelectChange}>
              <option value={-1} disabled selected>
                -Select a Treatement-
              </option>
              {traits.map((item) => (
                <option value={item.pk} key={item.pk}>
                  {" "}
                  {item.fields.name}
                </option>
              ))}
            </select>
            {/*<select label="Env" onChange={handleEnvChange}>
            <option disabled selected>
              -Select an Env-
            </option>
            {Env.map((item) => (
              <option value={item.pk} > {item.fields.name}</option>
            ))}
            </select>*/}
         
        {selectedTreaitementID && (<Button onClick={handleAddSelectionModal}>add table</Button>)}
        
        {openAddSelectionModal && (
          <Traitement
            SchemaID={SchemaID ? SchemaID : null}
            TraitementID={selectedTreaitementID}
            setopenAddSelectionModal={setopenAddSelectionModal}
          />
        )}
        {openSubmitModal && (
          <SubmitModal
            setSubmitModal={setSubmitModal}
            TraitementID={selectedTreaitementID}
          ></SubmitModal>
        )}
        </div>
        </FormControl>
      </div>

      { selectedTreaitementID!==-1 &&  
      <div style={{display:"flex",gap:"3px"}}>
      <Button onClick={handleClick}>
        <ArrowCircleLeftIcon /> All Treatments 
      </Button> 
      </div>  
       }
     
   


      <div className="box box2">
        {selectedTreaitementID !==-1 && (
          <BasicTable
            id={selectedTreaitementID}
            refreshData={refreshData}
          ></BasicTable>
        )}
      </div>
      <div className="box box3">
      
        {selectedTreaitementID!==-1 && (
          <Button
            variant="contained"
            sx={{backgroundColor:"#08dbba" ,":hover":{backgroundColor:"#00CCAA"}}}
            
            align=""
            onClick={handleSubmitModal}
          >
            Submit
          </Button>
        )}
        {selectedTreaitementID ==-1 &&  <TraitementElements />    }
      </div>
      </div>
  
  );
}
