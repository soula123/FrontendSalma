import React, { useState, useEffect } from "react";
import axios from 'axios';

import "./addDb.css"
import cogoToast from "cogo-toast";

function Form() {
  const [tested,setTested] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    password: "",
    DSN:"",
    serviceName: "",
  });
  const Testconnection = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/testconnnection",formData)
    .then(response => {
      alert(response.data['message']);
      setTested(false);

    })
    .catch(error => {
      alert(error);
      setTested(true);
    });
    // handle form submission here
    console.log(formData);

  }
  const [schemaOptions, setSchemaOptions] = useState([]);

  useEffect(() => {
    // fetch schema options from Django database
    axios.get("http://127.0.0.1:8000/api/ShowSchemeNames")
      .then((response) => {
        setSchemaOptions(response['data']['schema_names']);
        console.log(response['data']['schema_names'])
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
    axios.post("http://127.0.0.1:8000/api/AddDatabase",formData)
    .then(response => cogoToast.success('database added! '))
    // handle form submission here
    console.log(formData);
  };
}
  return (
    
    <form className='Form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dsn">DSN(link):</label>
        <input
          type="text"
          id="DSN"
          name="DSN"
          value={formData.DNS}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="schema">Schema:</label>
        <select
          id="schema"
          name="schema"
          value={formData.schema}
          onChange={handleChange}
        >
          <option value="">Select a schema</option>
          {schemaOptions.map((schema,key) => (
            <option key={key} value={schema[0]}>
              {schema[0]}
            </option>
          ))}
        </select>
      </div>
      <button className="btin" disabled={tested} type="submit">Submit</button>
      <button className="btin" onClick={Testconnection}>Test connection</button>
    </form>
    
    
  );
}

export default Form;
