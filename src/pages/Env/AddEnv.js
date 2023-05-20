import React from "react";
import Modal from "react-modal";
import CloseButton from "react-bootstrap/CloseButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import Close from "@mui/icons-material/Close";
import axios from "axios";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
import AddIcon from "@mui/icons-material/Add";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import cogoToast from 'cogo-toast';

import "./addDb.css";

const theme = createTheme();

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function AddEnv() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const [tested, setTested] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    password: "",
    DSN: "",
  });

  const baseUrl = process.env.REACT_APP_BASE_URL;

  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
if (formData.name=='' || formData.DSN=='' || formData.password=='' || formData.user=='' ) {

  cogoToast.error('Please Fill out all the form')
}    

else {
axios
      .post(`${baseUrl}/api/AddDatabase`, formData)
      .then((response) =>cogoToast.success('Database added !! ')      );
    // handle form submission here
    console.log(formData);
  };
}
  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
  const [schema, setSchema] = React.useState("");

  {
    /*  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };*/
  }
  const [checkedItems, setCheckedItems] = useState([]);
  
  function DeleteItems() {
    console.log("in deleteItems Function");
    if (checkedItems.length === 0) {
    } else {
      axios
        .post(`${baseUrl}/api/delete`, checkedItems)
        .then((response) => {
          cogoToast.success('Items deleted succefully ! ')
        })
        .catch((error) => {
          cogoToast.error(error)
        });
    }
  }
    const [open, setOpen] = useState(false);


  const handleClose = () => setIsOpen(false);
  return (
    <div>
     
      <Button
        onClick={openModal}
        style={{
          backgroundColor: "white",
          color: "#566787",
          border: "0px",
          borderRadius: "4px",
          marginLeft: "1070px",
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
          color: "#566787",
          border: "0px",
          borderRadius: "4px",
          marginLeft: "10px",
          height: "40px",
        }}
      >
        <span>
          Delete <FontAwesomeIcon icon={faTrash} size="lg" />
        </span>
      </Button>

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
                Add Environement
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} >
                    <TextField
                      name="name"
                      required
                      fullWidth
                      id="name"
                      value={formData.name}
                      label="name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="user"
                      label="User"
                      name="user"
                      value={formData.user}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="DSN"
                      label="DSN"
                      id="DSN"
                      value={formData.DSN}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      fullWidth
                      id="schema"
                      name="schema"
                      value={formData.schema}
                      onChange={handleChange}
                    >
                      <option value="">Select a schema</option>
                      {schemaOptions.map((schema, key) => (
                        <MenuItem key={key} value={schema[0]}>
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
                  sx={{  ml:2, mt: 3, mb: 2 , backgroundColor:"#08dbba",":hover":{backgroundColor:"#fff " , color:"#000000"} }}       
                  onSubmit={handleSubmit}
                >
                  Add Environement
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

export default AddEnv;
