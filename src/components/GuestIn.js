import React,{ Component,useState, useEffect } from 'react';
import './GuestIn.css';
import GuestEntry from './GuestEntry';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function GuestIn(){

  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const validateUsername = (e) => {
    const input = e.target.value;

    // Check if the input contains whitespace.
    if (input.includes(' ')) {
      alert('Username cannot contain whitespace.');
      return;
    }
    if (input.includes('.')) {
      alert('Username cannot contain dot.');
      return;
    }
    // Check if the input starts with a number.
    if (/^\d/.test(input)) {
      alert('Username cannot start with a number.');
      return;
    }

    setUsername(input);
  };

  //password validation
  const [password, setPassword] = useState('');

  const validatePassword = (e) => {
    const input = e.target.value;

    // Check if the input contains whitespace.
    if (input.includes(' ')) {
      alert('Password cannot contain whitespace.');
      return;
    }
    setPassword(input);
  };

  //ConfirmPass validation
  const [confirmPass, setConfirmPass] = useState('');

  const validateConfirmPass = (e) => {
    const input = e.target.value;

    // Check if the input contains whitespace.
    if (input.includes(' ')) {
      alert('Password cannot contain whitespace.');
      return;
    }
    setConfirmPass(input);
  };

  

  //handle SignUp Submit Click
  const handleSignUp = (e) => {
    if(username == ''){
      alert('Username is Empty');
    }
    else if(password == ''){
      alert('Password is Empty');
    }
    else if(confirmPass == ''){
      alert('Confirm Password is Empty');
    }
    else if(document.getElementsByClassName("form-control")[1].value !== document.getElementsByClassName("form-control")[2].value){
      alert("Password doesn't match.");
    }
    else if(username !== '' && password !== ''){
    
      const fetchRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
          identifier: username+'_'
        })
      };

      fetch('http://localhost:8080/gb/guest', fetchRequest)
        .then((response) => {
          if (response.status == "200") {
            setUsername('');
            setPassword('');
            setConfirmPass('');
           alert("Registered");
           
          }
          else{
            alert("fail to register");
          }
          //return response.json();
        })
      /*  .then((data) => {
          setResponse(data);
        })
        .catch((error) => {
          setError(error);
        });
        */
      
  
    }
  }

//Guest login
const [logPassword, setLogPassword] = useState('');
const [logUsername, setLogUsername] = useState('');

const handleChangename = (e) => {
  const input = e.target.value;

  // Check if the input contains whitespace.
  if (input.includes(' ')) {
    alert('Username cannot contain whitespace.');
    return;
  }
  setLogUsername(input);
};
const handleChangepass = (e) => {
  const input = e.target.value;

  // Check if the input contains whitespace.
  if (input.includes(' ')) {
    alert('Password cannot contain whitespace.');
    return;
  }
  setLogPassword(input);
};


const [isHidden, setIsHidden] = useState(false);
const [showGuestEntry, setShowGuestEntry] = useState(false);

  //handle Login Submit Click
  const handleLogin = (e) => {
  
    if(logUsername == ''){
      alert('Username is Empty');
    }
    else if(logPassword == ''){
      alert('Password is Empty');
    }
   
    if(logUsername !== '' && logPassword !== ''){
    
      const fetchRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: logUsername,
          password: logPassword
        })
      };
     
      fetch('http://localhost:8080/gb/guest-login', fetchRequest)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
           if (data && data.statusCode === '200') {
            Cookies.set('username',logUsername, { expires: 7 });
            navigate('/guest/entry?n='+logUsername);
            setIsHidden(!isHidden);
            setShowGuestEntry(true);
          } 
          else{
            alert('Guest not Exists')
          }
        })
       
        
      
  
    }
  }

  


    return(
       <>
       <div className='main-block'>
        <div className='main-head'>
        <h3>GuestBook</h3>
        </div>
        <div className='align'>
        <a href="/">Home</a>
        </div>
       <div className='main-container' style={{ display: isHidden ? 'none' : 'flex' }}>
       <div className='sign-up'>
       <h5 className='form-head'>Registration</h5>
       <form>
        <div className="mb-3">
  
  <input type="text" className="form-control" id="regusername" placeholder="Username"  value={username} onChange={validateUsername}
         required  />
            
</div>
<div className="mb-3">

  <input type="text" className="form-control" id="regpassword" placeholder="Password" value={password} onChange={validatePassword}   required/>
 
</div>
<div className="mb-3">

  <input type="text" className="form-control" id="regconfirmpass" placeholder="Confirm Password" value={confirmPass} onChange={validateConfirmPass}  required/>
 
</div>
<div className="reg-grid">
  <button type="button" className="btn btn-primary btn-block" onClick={handleSignUp}>Submit</button>
</div>
</form>
</div>
<div className='vr'>
  
</div>
<div className='sign-in'>
<h5 className='form-head'>Login</h5>
        <div className="mb-3">

  <input type="text" className="form-control" id="logusername" placeholder="Username" value={logUsername} onChange={handleChangename}
         required/>
</div>
<div className="mb-3">
 
  <input type="text" className="form-control" id="logpass" placeholder="Password" value={logPassword} onChange={handleChangepass}
         required/>
</div>
<div className="log-grid">
  <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>LogIn</button>
  
</div>

</div>
</div>

{
showGuestEntry && (<GuestEntry username={logUsername+'_'} />)
}
</div>
       </>
    );
}

export default GuestIn;