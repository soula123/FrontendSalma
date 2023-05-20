import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CodeEditor from '@uiw/react-textarea-code-editor';
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import "./Traitement.css"
import {
  Tabs,
  Tab,
  IconButton,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Checkbox,
  TextField,
  Autocomplete,
  Modal,
  Button,
  Box,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "./Filter";
import { Margin } from "@mui/icons-material";

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




export default function Traitement({
  SchemaID,
  TraitementID,
  setopenAddSelectionModal,
}) {
  const [open, setOpen] = React.useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  //const SchemaID = props;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setopenAddSelectionModal(false);
  const [selectedTable, setTable] = useState(null);
  const [columnTypes, setcolumnTypes] = useState([]);
  const [selectedColumn, setColumns] = useState([]);
  const [isTableSelected, setisTableSelected] = useState(false);
  const [columnValue, setColumnValue] = useState("");
  const [ColumnOptions, setColumnOptions] = useState([]);

  const [operatorValue, setOperatorValue] = useState("");
  const [valueValue, setValueValue] = useState("");
  const [AndOrValue, setAndOrValue] = useState("AND");
  const [filterList, setFilterList] = useState([]);
  const [isAllchecked, setisAllchecked] = useState(false);
  const [Schema, setSchema] = useState([]);
  const [DeleteIndex, setDeleteIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [code, setCode] = useState("")
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlecheckboxchange = (event) => {
    setisAllchecked(event.target.checked);
  };

  const renderTabContent = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        return (
          <>
            <Form.Label className="labelName" htmlFor="basic-url">
              Type in your table name
            </Form.Label>
            <Autocomplete
              id="TableSelect"
              disablePortal
              value={selectedTable}
              onChange={(event, newValue) => {
                setTable(newValue);
              }}
              options={params}
              renderInput={(params) => <TextField {...params} label="Tables" />}
            />

            <Form.Label className="labelName" htmlFor="basic-url">
              Add your Columns
            </Form.Label>

            <Autocomplete
              multiple
              id="Columns-Select"
              disabled={isTableSelected || isAllchecked}
              options={ColumnOptions}
              disableCloseOnSelect
              onChange={(event, values) => setColumns(values)}
              required
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Columns"
                  placeholder="CHOOSE A COLUMN"
                />
              )}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllchecked}
                  disabled={isTableSelected}
                  onChange={handlecheckboxchange}
                />
              }
              label="Select All"
            />
            <br></br>
            {
              //filterList.map((filter, index) => (
              //<div key={index}>{filter}</div>
              //))
            }
            {filterList.map((item, index) => (
              <div key={item.id}>
                <Filter
                  key={item.id}
                  ColumnOptions={ColumnOptions}
                  ColumnTypes={columnTypes}
                  AndOrValue={AndOrValue}
                  setAndOrValue={setAndOrValue}
                  setDeleteIndex={() => DeleteFilter(index)}
                  index={index}
                  changeFilterValue={changeFilterValue}
                ></Filter>
              </div>
            ))}
            <Button onClick={addFilter} disabled={isTableSelected}>
              Add Filter
            </Button>
            <Button onClick={AddSelection}>Save</Button>
          </>
        );
      case 1:
        return (
          <>
            <CodeEditor
              value={code}
              language="sql"
              placeholder="Please enter SQL code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                height : 300,
                fontSize: 12,
                backgroundColor: "#f5f5f5",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              }}
            />
            <Button >Save</Button>
          </>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    console.log(typeof SchemaID);
    if (SchemaID == null) {
    } else {
      // fetch Schema from Django database
      axios
        .get(`${baseUrl}/api/showSchema/${SchemaID}/`)
        .then((response) => {
          const data = JSON.parse(response["data"]);
          setSchema(data[0].fields.schema_data);
        })
        .catch((error) => console.log(error));
    }
  }, [SchemaID]);
  const handleClearClick = (index) => {
    const newFilterList = [...filterList];
    newFilterList.splice(index, 1);
    setFilterList(newFilterList);
  };
  useEffect(() => {
    if (selectedTable === null) {
      setisTableSelected(true);
      setColumnOptions([]);
    } else {
      setisTableSelected(false);

      setColumnOptions(Schema[`${selectedTable}`].map((column) => column[0]));
      setcolumnTypes(Schema[`${selectedTable}`].map((column) => column[1]));
      console.log(columnTypes);
    }
  }, [selectedTable]);
  useEffect(() => {
    if (DeleteIndex === null) {
    } else {
      DeleteFilter(DeleteIndex);
      setDeleteIndex(null);
    }
  }, [DeleteIndex]);

  const params = Object.keys(Schema);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  const addFilter = () => {
    const newFilter = [...filterList];
    newFilter.push("");
    setFilterList(newFilter);
    console.log(filterList);
  };
  const changeFilterValue = (ind, newValue) => {
    const updatedArray = filterList.map((item, index) => {
      if (ind === index) {
        return newValue;
      } else {
        return item;
      }
    });
    setFilterList(updatedArray);
    console.log(filterList);
  };
  const DeleteFilter = (index) => {
    const newFilter = [...filterList];
    newFilter.splice(index, 1);
    setFilterList(newFilter);
  };

  const AddSelection = () => {
    const newFilterList = filterList.filter((item) => item.trim().length > 0);
    let columnsTosend = [];
    if (isAllchecked == true) {
      columnsTosend.push("*");
    } else {
      columnsTosend = [...selectedColumn];
    }
    const object = {
      table_name: selectedTable,
      columns: columnsTosend,
      filter: newFilterList,
      traitement: parseInt(TraitementID),
    };
    axios
      .post(`${baseUrl}/Dab/addTraitmentTable`, object)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(object);
    setopenAddSelectionModal(false);
  };

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    
    <div>
      {/*<Button onClick={handleOpen}>Add Table</Button>*/}
      <Modal
        open={setopenAddSelectionModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} style={{ left: "90%" }}>
            <CloseIcon />
          </IconButton>
          <Tabs value={activeTab} onChange={handleTabChange} color="secondary" centered sx={{color:"#08dbba"  }}>
            <Tab label="Simple Query Builder" />
            <Tab label="Advanced Query" />
          </Tabs>
          {renderTabContent(activeTab)}
        </Box>
      </Modal>
    </div>
    
  );
}
