import React, { useState, useEffect } from "react";
import {
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Filter(props) {
  const [columnValue, setColumnValue] = useState("");
  const [ColumnOption, setColumnOption] = useState([]);
  const [ColumnTypes, setColumnTypes] = useState([]);
  const [operatorValue, setOperatorValue] = useState("");
  const [operatorOptions , setOperatorOptions] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [amIFirst , setAmIFirst] = useState(false);
  const [AndOrValue , setAndOrValue] = useState("AND");
  const [filterValue,setfilterValue] = useState('');
  const [disableAndOrSelect,setdisableAndOrSelect] = useState(false);
  function handleValueChange(event) {
    setfilterValue(event.target.value);
  }
  const handleDelete = () =>{
    props.setDeleteIndex();
  }
  const changeFilterValue = (index , value) => {
    props.changeFilterValue(index,value);
  }

  useEffect(()=>{
    if(props.index == 0){
      setAmIFirst(true);
      
    }else if (props.index > 1){
      setdisableAndOrSelect(true);
    }
  },[props.index])
  useEffect(()=>{
    if(props.index == 1){
      props.setAndOrValue(AndOrValue)
      
    }else{
      setAndOrValue(props.AndOrValue)
    }
  },[AndOrValue , props.AndOrValue])
  
  useEffect(() => {
    if (props.ColumnOptions.length !== 0) {
      setColumnOption(props.ColumnOptions);
    }
    if (props.ColumnTypes.lenght !== 0) {
      setColumnTypes(props.ColumnTypes);
    }
  }, [props.ColumnOptions, props.ColumnTypes]);

  useEffect(()=>{
    console.log(`${columnValue} ${operatorValue} ${filterValue}`);
    if(columnValue !== ""){
      if(operatorValue !== "")
      if(filterValue !== ""){
        if(props.index == 0){
          if(operatorOptions.includes("LIKE")){
            changeFilterValue(props.index,`${columnValue} ${operatorValue} '${filterValue}'`);
          }else{
            changeFilterValue(props.index,`${columnValue} ${operatorValue} ${filterValue}`);
          }
          
        }else{
          if(operatorOptions.includes("LIKE")){
            changeFilterValue(props.index,`${AndOrValue} ${columnValue} ${operatorValue} '${filterValue}'`);
          }else{
            changeFilterValue(props.index,`${AndOrValue} ${columnValue} ${operatorValue} ${filterValue}`);
          }
          
        }
        
      }
    }
  },[columnValue,operatorValue,filterValue])

  useEffect(() => {
    if (ColumnOption.indexOf(columnValue) !== -1) {
      const colType = ColumnTypes[ColumnOption.indexOf(columnValue)];
      console.log(ColumnTypes[ColumnOption.indexOf(columnValue)]);
      let newOperators = [];

      switch (colType) {
        case "VARCHAR2":
          newOperators = ["=", "<>", "LIKE", "NOT LIKE"];
          break;
        case "NUMBER":
          newOperators = [
            "=",
            "<>",
            ">",
            ">=",
            "<",
            "<=",
            "BETWEEN",
            "NOT BETWEEN",
          ];
          break;
        case "DATE":
          newOperators = [
            "=",
            "<>",
            ">",
            ">=",
            "<",
            "<=",
            "BETWEEN",
            "NOT BETWEEN",
          ];
          break;
        default:
          newOperators = ["=", "<>"];
      }
      setOperatorOptions(newOperators);
    }
  }, [columnValue]);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };
  

  return (
    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
      <Grid container spacing={1}>
      {!amIFirst && (<Grid item xs={2}>
          <FormControl fullWidth variant="standard">
            <InputLabel></InputLabel>
            <Select
              id="AND-OR-Select"
              value={AndOrValue}
              disabled={disableAndOrSelect}
              onChange={(event) => handleChange(event, setAndOrValue)}
            >
                <MenuItem value="AND"> AND</MenuItem>
                <MenuItem value="OR"> OR</MenuItem>
            </Select>
          </FormControl>
        </Grid>)}
        <Grid item xs={amIFirst ? 4 : 3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Column</InputLabel>
            <Select
              id="Column-Select"
              value={columnValue}
              label="Column"
              onChange={(event) => handleChange(event, setColumnValue)}
            >
              {ColumnOption.map((item) => (
                <MenuItem value={item}> {item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={amIFirst ? 4 : 3}>
          <FormControl fullWidth variant="standard">
            <InputLabel>Operator</InputLabel>
            <Select
              id="Operation-Select"
              value={operatorValue}
              label="Operator"
              onChange={(event) => handleChange(event, setOperatorValue)}
            >
              {operatorOptions.map((item) => (
                <MenuItem value={item}> {item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth variant="standard">
            <TextField id="standard-basic" label="Value" value={filterValue} onChange={handleValueChange} variant="standard" required/>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleDelete}>  {/*onClick={props.setDeleteIndex(props.index)}*/} 
            <CloseIcon   />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
