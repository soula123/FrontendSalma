import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import { Container, Table,Button, Row } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faE, faPen , faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';    
import AddSchema from './AddSchema.js';
import Loader from "../Env/Loader.jsx";

import VisiualizeSchema from './VisiualizeSchema';

function SchemaCrude(){

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [detectedchange , setdetectedchange] = useState(false);
        const DeleteScheme=(e) =>{
          const id = e.target.id;
          console.log(id);
          console.log(`deleting ${id}`);
          axios.delete(`${baseUrl}/api/deleteSchema/${id}/`)
          .then(response => {
            alert(response.data["message"]);
            setdetectedchange(!detectedchange);
          })
          .catch(error => {
            alert(error)
          });
          fetchSchema();
        }
        {/* function fetchTraitement(){
    axios.get(`${baseUrl}/api/show_all_traitement`)
      .then((response) => {
        const data = JSON.parse(response['data']);
        setTraitementTable(data);
        
        
    })
      .catch((error) => console.log(error));
  }*/}
      function fetchSchema(){
        axios.get(`${baseUrl}/api/ShowScheme`)
          .then((response) => {
            const data = JSON.parse(response['data']);
            setDatabase(data);
            
            
        })
          .catch((error) => console.log(error));
      }
      const [database,setDatabase] = useState([]);
      
      useEffect(() => {
        // fetch schema options from Django database
        fetchSchema();
        
        }, [detectedchange]);
      const [checkedItems, setCheckedItems] = useState([]);
      function handleCheckboxChange(event) {
        const checked = event.target.checked;
        const itemID = parseInt(event.target.value);
    
        if (checked) {
          setCheckedItems([...checkedItems, itemID]);
        } else {
          setCheckedItems(checkedItems.filter(item => item !== itemID));
        }
      }
      function handleSelectAll(event) {
        if (event.target.checked) {
          setCheckedItems(database.map(item => item.pk));
        } else {
          setCheckedItems([]);
        }
      }
      const[loader,setLoader]=useState(true)
      useEffect(() => {
        const timer = setTimeout(() => {
          setLoader(false);
        }, 2000);
        return () => clearTimeout(timer);
      }, []);
    
    return(
        <div className='class="d-flex justify-content-center' style={{width:"100%",padding:"10px",marginLeft:"15px"}}> 
                    <div className="table-title ">
                      <Row>
                      <div style={{color:"#566787"}}>
                          <h2>Manage <b>Schema</b></h2>
                        </div>
                        <div className="col-xs-6">
                          
                          <AddSchema/> 
                        </div>
                        </Row>
                    </div>
                    {loader ? <Loader /> : 
                <Table className='table-striped table-hover mx-auto '>
                    <thead>
                        <tr>
                          <th>
                            <span className="custom-checkbox">
                              <input type="checkbox" id="selectAll" onChange={handleSelectAll}/>
                              <label htmlFor="selectAll" />
                            </span> 
                            
                          </th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {database.map((item, index) => (
                        
                        <tr>
                        <td>
                          <span className="custom-checkbox">
                            <input type="checkbox" id="checkbox1" onChange={handleCheckboxChange} value={item.pk} checked={checkedItems.includes(item.pk)} name="options[]"  />
                            <label htmlFor="checkbox1" />
                          </span>
                        </td>
                        <td>{item.fields.schema_name}</td>
                        <td>
                          <span>{item.fields.description} </span>
                        </td>
                        <td>
                        <Button variant="outline-dark" size='sm' id={item.pk}>
                          <FontAwesomeIcon icon={faPen} size='lg'/>
                        </Button>
                        
                        <VisiualizeSchema array = {item.fields.schema_data} ></VisiualizeSchema>
                        <Button variant="outline-dark" size='sm' id={item.pk} onClick={(e) => DeleteScheme(e)}><FontAwesomeIcon icon={faTrash} size='lg'/></Button>
                        </td>
                      </tr>
                        ))}
                    </tbody>
                    
                </Table>
}
           </div>
    )
}

export default SchemaCrude;