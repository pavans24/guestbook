import React,{ Component,useState, useEffect } from 'react';
import './AdminLogin.css';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function AdminLogin(){
    const navigate = useNavigate();
    //Guest login
const [adminPassword, setAdminPassword] = useState('');
const [adminUsername, setAdminUsername] = useState('');

const handleadminname = (e) => {
  const input = e.target.value;
console.log(localStorage.getItem('imageData'));

  // Check if the input contains whitespace.
  if (input.includes(' ')) {
    alert('Username cannot contain whitespace.');
    return;
  }
  setAdminUsername(input);
};
const handleadminpass = (e) => {
  const input = e.target.value;

  // Check if the input contains whitespace.
  if (input.includes(' ')) {
    alert('Password cannot contain whitespace.');
    return;
  }
  setAdminPassword(input);
};


  //handle Login Submit Click
  const adminSubmit = (e) => {
  
    if(adminUsername == 'admin' && adminPassword == 'test'){
      Cookies.set('adminname', 'admin', { expires: 7 });
        navigate('/dashboard'); 
    }
    else{
        alert("Username/Password Incorrect");
    }
  }



    return(
        <>
        <div className='main-block'>
 <div className='main-head'><h3>GuestBook</h3>
 <div className='align'>
        <a href="/">Home</a>
        </div>
 </div>
 
<div className='admin-sign-in'>
    <div className='inner-block'>
<h5 className='form-head'>Login</h5>
        <div className="mb-3">

  <input type="text" className="form-control" id="logusername" placeholder="Username" value={adminUsername} onChange={handleadminname}
         required/>
</div>
<div className="mb-3">
 
  <input type="text" className="form-control" id="logpass" placeholder="Password" value={adminPassword} onChange={handleadminpass}
         required/>
</div>
<div className="log-grid">
  <button type="button" className="btn btn-primary btn-block" onClick={adminSubmit}>LogIn</button>
  
</div>
</div>
</div>
</div>
   

</>
    )
}
export default AdminLogin;