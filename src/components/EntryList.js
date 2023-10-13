import React,{ Component,useState, useEffect } from 'react';
import './EntryList.css';
import validator from 'validator';
import { json } from 'react-router-dom';

function EntryList(props) {
 
  const [response, setResponse] = useState('');
  const [approveResponse, setApproveResponse] = useState(true);
  const [entryName, setEntryname] = useState(props.entryname);
  console.log('email add:'+props.email);
  const [entryEmail, setEntryEmail] = useState(props.email);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showEditSubmit,setShowEditSubmit] = useState(false);

  const handleDisableToggle = () => {
    setIsDisabled(!isDisabled);
  };

  const handleEdit = (e) => {
    setIsDisabled(false);
    setShowEditSubmit(true);
  }

  //edit button click
  const handleEditSubmit = (e) => {
    
    const isValid = validator.isEmail(entryEmail);

   
    const fetchRequest = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: entryName,
        email:entryEmail
      })
    };
    if(!isValid){
      alert('Not Valid Email Address')
    }
    else{
   fetch('http://localhost:8080/gb/editEntry?'+'id='+props.id, fetchRequest)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.message);
    if(data.message === 'Edited' ){
      setIsDisabled(true);
      setShowEditSubmit(false);
    }
    else{
        alert("Not Edited");
    }
         setResponse(data);
      });
    }
    
    
  }
  const handleName = (e) => {
    const input = e.target.value;

    // Check if the input contains whitespace.
    if (input.includes(' ')) {
      alert('Name cannot contain whitespace.');
      return;
    }
    if (input.includes('.')) {
      alert('Name cannot contain dot.');
      return;
    }
    // Check if the input starts with a number.
    if (/^\d/.test(input)) {
      alert('Name cannot start with a number.');
      return;
    }

    setEntryname(input);
  };


const handleEmail = (e) => {
  const input = e.target.value;
 
  setEntryEmail(input);
};

  const handleApprove = (e) => {
    const fetchRequest = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    };
   
   fetch('http://localhost:8080/gb/approveEntry?'+'id='+props.id, fetchRequest)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.message);
    if(data.message === 'Approved' ){
      setApproveResponse(false);
    }
    else{
        alert("Not Approved");
    }
         setResponse(data);
      });
    
    
  }


  //handle Remove button
  const [responseNew, setResponseNew] = useState('');
  const [removeResponseNew, setRemoveResponseNew] = useState(true);
  const handleRemove = (e) => {
    const fetchRequest = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
   
   fetch('http://localhost:8080/gb/removeEntry?'+'id='+props.id, fetchRequest)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if(data && data.status == 'success'){
         
          setRemoveResponseNew(false);
      
        }
        else{
          alert("Not Removed");
      }
       
        
      });
    
  
  
  }
  
  return (
   
    <>
    { removeResponseNew && (<div className='entry-cards' key={props.id}>
      <div className='cards'>

        
         <img className='cards-pic' src={props.image} />
         <div className='flex-it'>
          <div className='inner-btn'>
            <input value={entryName} onChange={handleName}  disabled={isDisabled} />
            
           </div>
           <div className='inner-btn'>

            <input value={entryEmail} onChange={handleEmail} disabled={isDisabled} />
           </div>
           <div className='inner-btn'>
    {!showEditSubmit && (<button className='card-button' onClick={handleEdit}>Edit</button>) }
    </div>
    <div className='inner-btn'>
    {showEditSubmit && (<button className='card-button' onClick={handleEditSubmit}>Submit</button>)}
     </div>
           <div className='inner-btn'>
{  approveResponse && 
( <button className='card-button' onClick={handleApprove}>Approve</button>
)
}
</div>

  <div className='inner-btn'>
    <button className='card-button' onClick={handleRemove}>Remove</button>
     </div>
     </div>
     </div><div></div></div>
  )
}
    </>
  );
}

export default EntryList;
