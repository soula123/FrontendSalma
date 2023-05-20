import { useState } from "react";
/*import ReactDOM from "react-dom/client";*/
import axios from 'axios';
function MyForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/AddScheme',inputs)
    .then(response => alert(response.data['message']));
  }

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label>user:
      <input 
        type="text" 
        name="user" 
        value={inputs.user || ""} 
        onChange={handleChange}
      />
      </label>
      <br/>
      <label>password:
        <input 
          type="password" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <br/>
        <label>DSN(Link)
            <input 
            type="text"
            name="DSN"
            value={inputs.DSN || ""}
            onChange={handleChange} 
            />
        </label>
        <br/>
        <label> Desciption
          <textarea
          name="description"
          
          onChange={handleChange}
          >

          </textarea>
        </label>
        <br/>
        <label>Schema Name
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
    </form>
  )
}

export default MyForm;


              