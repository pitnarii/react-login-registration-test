import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function Login() {
    // const Swal = require('sweetalert2')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "username": inputs.username,
        "password": inputs.password,
        "expiresIn": 60000
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://www.melivecode.com/api/login", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          if (result.status === 'ok') {
            Swal.fire({
              title: 'Logged-in Success!',
              // html:<i>{result.message}</i>,
              icon: 'success'
            }).then((value) =>{
              localStorage.setItem('token', result.accessToken)
              navigate('/profile')
            })
          } else {
            Swal.fire({
              title: 'Unable to Log-in!',
              // html:<i>{result.message}</i>,
              icon: 'error'
            })
          }
        })
        .catch(error => console.log('error', error));

        console.log(inputs);
      }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange}
                />
            </label>
            <label>Password:
                <input 
                type="password" 
                name="password" 
                value={inputs.password || ""} 
                onChange={handleChange}
                />
            </label>
        <input type="submit" />
    </form>
    </div>
  )
}

export default Login