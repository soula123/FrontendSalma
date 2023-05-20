import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Select } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from "react";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const handleChange = (event, setState) => {
  setState(event.target.value);
};
const theme = createTheme();

export default function Formu() {
  const [schemaOptions, setSchemaOptions] = useState([]);
const baseUrl = process.env.REACT_APP_BASE_URL;
const [selectedSchema, setselectedSchema] = useState(0);
const [TraitementName, setTraitementName] = useState("");


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
    console.log("nzelt")
    event.preventDefault();
    const obj = {
      name:TraitementName,
      schema: selectedSchema,
    }

    axios
    .post(`${baseUrl}/Dab/addTraitment`,obj)
    .then((response) => {
      
      console.log("this is the response :",response);
    })
    .catch((error) => console.log(error));
    console.log("obj");
  };
  const closeModal=(e)=>{
    e.preventDefault();
    setIsOpen(false)
   }

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
 
  return (
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
               sx={{ mt: 3, mb: 2 ,":hover":{ color:"red"} }}
               

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
  );
}