import React, { useState, useEffect } from "react";
import {
  IconButton,
  Modal,
  Button,
  TextField,
  Box,
  Autocomplete,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

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

export default function SubmitModal({setSubmitModal , TraitementID}) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  function ExecuteTraitement() {
    const jsonObject = {
      traitement : TraitementID,
      env_source : Env1,
      env_target : Env2
    }
    axios
      .post(`${baseUrl}/Dab/executeTraitment`,jsonObject)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }
  const handleClose = () => {
    setSubmitModal(false);
  };
  function handleSubmitButton(){
    if(showTextFields=== true){
      ExecuteTraitement()
    }
  }

  const [value, setValue] = React.useState("SQLfile");
  const [showTextFields, setShowTextFields] = useState(false);
  const [Env, setEnv] = useState([]);
  const [Env1 , setEnv1] = useState(null);
  const [Env2 , setEnv2] = useState(null);
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/ShowEnv`)
      .then((response) => {
        const data = JSON.parse(response["data"]);

        setEnv(data);
      })
      .catch((error) => console.log(error));
  },[]);
  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "BaseToBase") {
      setShowTextFields(true);
    } else {
      setShowTextFields(false);
    }
  };
  const handleSelectChange = (event, setState) => {
    setState(event.target.value);
    console.log(event.target.value);
  };
  
  return (
    <div>
      <Modal
        open={setSubmitModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{ left: "95%", marginTop: "0" }}
          >
            <CloseIcon />
          </IconButton>

          <FormControl style={{ marginLeft: "4%", marginBottom: "5%" }}>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Choose your dump and load method:{" "}
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="SQLfile"
                control={<Radio />}
                label="SQL file"
              />

              <FormControlLabel
                value="csvFile"
                control={<Radio />}
                label="CSV file"
              />
              <FormControlLabel
                value="BaseToBase"
                control={<Radio />}
                label="Base To Base"
              />
            </RadioGroup>
          </FormControl>

          {showTextFields && (
            <div style={{ marginBottom: "9%" }}>
              <select id="env" name="environement" value={Env1} onChange={(event)=>handleSelectChange(event,setEnv1)} >
                <option disabled selected value="noValue">Select source database</option>
                {Env.map((item) => (
                  <option value={item.pk}> {item.fields.name}</option>
                ))}
              </select>

              <select id="targetEnv" name="environement" value={Env2} onChange={(event)=> handleSelectChange(event,setEnv2)}>
                <option disabled selected value="noValue">Select target database</option>
                {Env.map((item) => (
                  <option value={item.pk}> {item.fields.name}</option>
                ))}
              </select>
            </div>
          )}

          <Button
            style={{ position: "absolute", top: "85%", right: "10%" }}
            variant="contained"
            onClick={handleSubmitButton}
          >
            Export
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
