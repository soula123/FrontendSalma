import React from "react";
import Modal from "react-modal";
//import "./AddEmp.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import CloseButton from "react-bootstrap/CloseButton";
import { useState } from "react";
/*import ReactDOM from "react-dom/client";*/
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Select } from "@mui/material";
import { faTrash } from '@fortawesome/free-solid-svg-icons';    

import TextareaAutosize from "@mui/base/TextareaAutosize";

const theme = createTheme();

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function AddSchema() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  const [inputs, setInputs] = useState({});
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${baseUrl}/api/AddScheme`, inputs)
      .then((response) => alert(response.data["message"]));
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const [detectedchange , setdetectedchange] = useState(false);

  function DeleteItems(){
    console.log('in deleteItems Function');
    if(checkedItems.length === 0){
   }else{
    axios.post(`${baseUrl}/api/DeleteSchema`, checkedItems)
      .then(response => {
        alert(response.data["message"]);
        setdetectedchange(!detectedchange);
      })
      .catch(error =>{
        alert.error(error);
      });
    }

  }

  function openModal() {
    setIsOpen(true);
  }
  const handleClose = () => setIsOpen(false);

  return (
    <div>

        <Button
          onClick={openModal}
          style={{
            backgroundColor: "white",
              color:'#566787',
              border:"0px",
              borderRadius:"4px",
              marginLeft:"1070px",
              height: "40px",
          }}
          data-toggle="modal"
        >
          <span>
            Add <FontAwesomeIcon icon={faPlus} size="lg" />
          </span>
        </Button>
        <Button 
      onClick={DeleteItems} 
      style={{
        backgroundColor: "white",
          color:'#566787',
          border:"0px",
          borderRadius:"4px",
          marginLeft:'10px',
          height: "40px",
      }}
      ><span>Delete <FontAwesomeIcon icon={faTrash} size='lg'/></span></Button>	


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <CloseButton
            style={{ postision: "fixed", right: "1px" }}
            onClick={closeModal}
          />
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "#08dbba" }}>
                  <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Schema
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="name"
                        label="Schema name"
                        id="name"
                        
                        value={inputs.name || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="user"
                        required
                        fullWidth
                        id="user"
                        value={inputs.user || ""}
                        onChange={handleChange}
                        label="User"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        
                        value={inputs.password || ""}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="DSN"
                        label="DSN"
                        type="DSN"
                        name="DSN"
                        autoComplete="new-password"
                        value={inputs.DSN || ""}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder="Description"
                      
                        name="description"
                        onChange={handleChange}
                      />
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
                    sx={{  ml:2, mt: 3, mb: 2 , backgroundColor:"#08dbba",":hover":{backgroundColor:"#fff " , color:"#000000"} }}                     onSubmit={handleSubmit}
                  >
                    Add Schema
                  </Button>
                  </Grid>
                  <Grid container justifyContent="flex-end"></Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
         
        </Modal>
    </div>
  );
}

export default AddSchema;