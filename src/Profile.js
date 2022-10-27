import {useState, useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Profile() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
};

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
    .then(response => response.json())
    .then(result => {
      if (result.status === 'ok') {
        setUser(result.user)
        setIsLoaded(false)
      } else if (result.status === 'forbidden') {
        Swal.fire({
          title: 'Access Token Invalid!',
          // html:<i>{result.message}</i>,
          icon: 'error'
        }).then((value) => {
          Navigate('/')
        })
        Navigate('/')
      }
    console.log(result)})
    .catch(error => console.log('error', error));
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    Navigate('/')
  }

  if (isLoaded) return (<div>Loading</div>)
  else {
    return (
      <div>
        <div>{user.fname}</div>
        <div>{user.lname}</div>
        <div>{user.Username}</div>
        <div>{user.email}</div>
        {/* <img src={user.avatr} alt={}></img> */}
        <div><button onClick={logout}>logout</button></div>
      </div>
    )
  }
  
}

export default Profile