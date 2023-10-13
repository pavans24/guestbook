import React,{ Component,useState, useEffect } from 'react';
import './AdminDashboard.css';
import EntryList from './EntryList'
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [response,setResponse]=useState([])
  const [entryCheck,setEntryCheck]=useState(false)
  

  useEffect(() => {
    //console.log(response)
  }, [response])

      const fetchRequest = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      };
     
    const fetchEntries =async() =>{ fetch('http://localhost:8080/gb/entries', fetchRequest)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
           setResponse(data);
           
        })
      };

      const logOutAdmin = (e) => {
        Cookies.remove('adminname');
    navigate('/admin');
      }
       
      useEffect(() => {
        fetchEntries();
       
      }, []);

      const filteredData = response.filter(value => value.name !== null && value.name !== '');
      
      

  return (
    <>
     <div className='main-block'>
     <div className='main-head'><h3>GuestBook</h3>
     <div className='top-header'>
     <a href="/">Home</a>
      <button onClick={logOutAdmin} >LogOut</button>
     </div>
     </div>
    
      <h2 className='align head'>Admin Dashboard</h2>
      <div className='align'>
      { entryCheck && (<p>No Entries Available</p>
  )}
  </div>
      <div className='flex-box'>

      {  Array.isArray(filteredData) ? filteredData.filter(item => item.name !== null && item.name !== '')
      .map(ele=>{
          return(
         
      <EntryList id={ele.id} entryname={ele.name} mail={ele.email} image={ele.image} message={ele.message} />
      
          )
          
        }
        ) : null
      }
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
