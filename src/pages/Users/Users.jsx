import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Container, Table, Button, Row } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import cogoToast from "cogo-toast";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Users.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Loader from "../Env/Loader";
import AddUser from "./AddUser.jsx";



function Users() {
  const [loading, setLoading] = useState({});
  
  const [statusIcon, setStatusIcon] = useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
{/* const DeleteEnv = (e) => {
    const id = e.target.id;
    console.log(id);
    console.log(`deleting ${id}`);
    axios
      .delete(`${baseUrl}/api/deleteEnv/${id}/`)
      .then((response) => {
        cogoToast.success("Item deleted");
      })
      .catch((error) => {
        cogoToast.error(error);
      });
  };
*/}

{/*  const fetchdata = async () => {
    axios
      .get(`${baseUrl}/api/displayAll`)
      .then((response) => {
        const data = JSON.parse(response["data"]);
        setDatabase(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    // fetch schema options from Django database
    fetchdata();
  }, []);
*/  }

  
  

 
  const [checkedItems, setCheckedItems] = useState([]);
  function handleCheckboxChange(event) {
    const checked = event.target.checked;
    const itemID = parseInt(event.target.value);

    if (checked) {
      setCheckedItems([...checkedItems, itemID]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== itemID));
    }
  }
{/* function handleSelectAll(event) {
    if (event.target.checked) {
      setCheckedItems(database.map((item) => item.pk));
    } else {
      setCheckedItems([]);
    }
  }
 */}
  

  const[loader,setLoader]=useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div
      className='class="d-flex justify-content-center'
      style={{ width: "100%", padding: "10px", marginLeft: "15px" }}
    >
  
      <div className="table-title ">
        <Row>
          <div style={{ color: "#566787" }}>
            <h2>
              Manage <b>Users</b>
            </h2>
          </div>
          <div className="col-xs-6">
                   
                  <AddUser />
          </div>
        </Row>
      </div>
      {loader ? <Loader /> : 
      <Table className="table-striped table-hover mx-auto ">
        <thead>
          <tr>
            <th>
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  id="selectAll"
            
                />
                <label htmlFor="selectAll" />
              </span>
            </th>

            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
           {/*  {database.map((item, index) => (
            <tr>
              
              <td>
                <span className="custom-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    value={item.pk}
                    checked={checkedItems.includes(item.pk)}
                    name="options[]"
                  />
                  <label htmlFor="checkbox1" />
                </span>
              </td>
              <td>{item.fields.name}</td>
              <td>{item.fields.user}</td>
              <td>
                <span type="password">{item.fields.password}</span>
              </td>

              <td>{item.fields.dsn}</td>
              <td>{item.fields.schema}</td>
              <td>
              {loading[item.pk]===true ? <ClipLoader size={20} color={"#08dbba"}/> : tested[item.pk]=== true? statusIcon:<></> }
              </td>
              <td>
        
                <div style={{ display: "flex" }}>
                
                  <Button
                    variant="outline-dark"
                    size="sm"
                    id={item.pk}
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </Button>
                </div> 
          
                </tr>
                
          ))}
          */}
        </tbody>
      </Table>
      }
    </div>
  );
}

export default Users;
