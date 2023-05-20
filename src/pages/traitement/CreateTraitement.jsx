import React, { useState, useEffect } from "react";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import "./page.css"
//import "./Traitement.css"
import {
  Modal,
  Button,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Select } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreateModal() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [selectedSchema, setselectedSchema] = useState(0);
  const [TraitementName, setTraitementName] = useState("");
  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  const theme = createTheme();
  
 
    const [schemaOptions, setSchemaOptions] = useState([]);
  
  
  useEffect(() => {
    // fetch schema options from Django database
    axios
      .get(`${baseUrl}/api/ShowSchemeNames`)
      .then((response) => {
        setSchemaOptions(response["data"]["schema_names"]);
        console.log(response["data"]["schema_names"]);
      })
      .catch((error) => console.log(error));
  }, []);
   
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
  
    const [open, setOpen] = useState(false);


    const handleSubmit = (event) => {
      event.preventDefault();
      const obj = {
        name:TraitementName,
        schema: selectedSchema,
      }
          console.log("hedha l objet ",obj)

      if (obj.name=="" )
{ 
  cogoToast.error('please type a treatment name');

}else 

if (obj.schema==0) 
{ 
  cogoToast.error('please choose a schema ');

}
else 
{      
      axios
      .post(`${baseUrl}/Dab/addTraitment`,obj)
      .then((response) => {
        cogoToast.success('Treatment added ! ');

      })
      .catch((error) => console.log(error));
    };}
   
  
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
 
  return (
    <div>
      <button onClick={handleOpen} 
      className="buttonCreate">
            Create Treatment
      </button>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#08dbba' }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Treatment
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  value={TraitementName}
                  onChange={(event) => handleChange(event, setTraitementName)}
                  id="firstName"
                  label="Treatment Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  value={selectedSchema}
                  onChange={(event) => handleChange(event, setselectedSchema)}
                  label="schema"
                  name="schema"
                  
                  
                >
                 <MenuItem disabled selected value={0}>select a schema</MenuItem>
                 {schemaOptions.map((schema, key) => (
                      <MenuItem key={key} value={schema[1]}>
                        {schema[0]}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
             
              
            </Grid>
            
            <Grid container justifyContent="flex-end">
            <Button
               sx={{ color: "#08dbba", mt: 3, mb: 2 ,":hover":{ color:"red"} }}
               

               onClick={handleClose}
               >
                Cancel
                </Button>
          <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              sx={{  ml:2, mt: 3, mb: 2 , backgroundColor:"#08dbba",":hover":{backgroundColor:"#fff " , color:"#000000"} }}
            >
              Create
            </Button>
        
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
          <div className="Buttons"> 
          </div>
        </Box>
      </Modal>
    </div>
  );
}