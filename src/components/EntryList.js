import React,{ Component,useState, useEffect } from 'react';
import './EntryList.css';
function EntryList(props) {
 
  const [response, setResponse] = useState('');
  const [approveResponse, setApproveResponse] = useState(true);
  const handleApprove = (e) => {
    const fetchRequest = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    };
   
   fetch('http://localhost:8080/gb/approveEntry?'+'name='+props.entryname, fetchRequest)
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
   
   fetch('http://localhost:8080/gb/removeEntry?'+'name='+props.entryname, fetchRequest)
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

        
         <div className='cards-pic'></div>
          <div><p>{props.entryname}</p><p>{props.mail}</p>
           </div><div>
{ props.message === null && approveResponse && 
( <button className='card-button' onClick={handleApprove}>Approve</button>
)
}
</div>

  <div>
    <button className='card-button' onClick={handleRemove}>Remove</button>
     </div>
     </div><div></div></div>
  )
}
    </>
  );
}

export default EntryList;
