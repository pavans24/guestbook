
import React,{ Component,useState, useEffect, useRef } from 'react';
import './GuestEntry.css';
import validator from 'validator';
import Cookies from 'js-cookie';
import { useNavigate  } from 'react-router-dom';
import pako from 'pako';
import browserImageCompression  from "browser-image-compression";

function GuestEntry(props) {
  const navigate = useNavigate();


    //name
    const [entryname, setEntryname] = useState('');

  const validateName = (e) => {
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

  //email
  const [email, setEmail] = useState('');

  const validateEmail = (e) => {
    const input = e.target.value;
   
    setEmail(input);
  };

  //file
  const [file, setFile] = useState(null);
  const [imgString, setImgString] = useState(null);
 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const file = selectedFile;
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result;
      const encodedData = btoa(base64String); 
      // Now you have the image as a base64 string, which you can use in your React component
      console.log(base64String);
      const binaryData = atob(encodedData);

      // Convert the binary data to a Uint8Array
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
    
      // Compress the data
      const compressedData = pako.deflate(uint8Array);
    
      // Convert the compressed data to a Base64 string
      const compressedBase64String = btoa(String.fromCharCode.apply(null, compressedData));
     
      

       console.log("te"+localStorage.getItem('imageData'));
       
      setImgString(base64String);

     
    };

    reader.readAsDataURL(file);
    
     // Check file is selected
     if (selectedFile) {
        // Check file type(allow only images)
        if (selectedFile.type.startsWith('image/')) {
          // Check file size (limit to 5MB)
          if (selectedFile.size <= 5 * 1024 * 1024) {
            setFile(selectedFile);
          } else {
            alert('File size must be less than 5MB.');
          }
        } else {
          alert('Please select an image file.');
        }
      }
  };

  const [imageBlobURL, setImageBlobURL] = useState(null);
  const fileInputRef = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [indicator, setIndicator] = useState(null);
  const handleResetFile = () => {
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get('n');

    
    if (paramValue) {
      setIndicator(paramValue);
    }
  }, []);

 //handle Submit Click
 const handleEntry = (e) => {
    const isValid = validator.isEmail(email);
    
    if(entryname == ''){
        alert('Name is Empty');
    }
    else if (!isValid) {
      alert('Not a Valid Email');
      return;
    }
   
    if(entryname !== '' && email !== ''){

        let blobURL = '';
        

        if (file) {
            console.log("entry")
            const reader = new FileReader();
           
            reader.onload = (event) => {
              const blob = new Blob([event.target.result], { type: file.type });
              
              blobURL = URL.createObjectURL(blob);
              
              console.log("identifier:" + props.username)
              const fetchRequest = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  identifier: indicator+'_',
                  name: entryname,
                  email: email,
                  image: ''
                })
              };
              
              fetch('http://localhost:8080/gb/guest', fetchRequest)
              .then((response) => {
                if (response.status == "200") {
                 alert("registered");
                }
                else{
                  alert("fail to register");
                }
                setEntryname('');
                setFile(null);
                setEmail('');
                setImageBlobURL(null);
                handleResetFile();
                return response.json();
              })
              .then((data) => {
                if(data && data.id != '')
                console.log('id:'+data.id)
                localStorage.setItem(data.id, imgString);
              })
            };
      
            reader.readAsArrayBuffer(file);
            setImageBlobURL(blobURL);
            console.log("in"+blobURL)
           
     
           
          }
         
    

      
  
    }
  }

  const logOutSubmit = (e)=>{
    Cookies.remove('username');
    navigate('/guest')
  };

  return (
    <> 
 
    <div className='main-head'>
    <h3>GuestBook</h3>
    <div className='top-header'>
    <a href="/">Home</a>
      <button onClick={logOutSubmit}>LogOut</button>
      </div>
    </div>
      <div className='entry-block'>
        <div className='inner-block'>
       <h5 className='form-head'>Guest Entry Form</h5>
       <form>
        <div className="mb-3">
  
  <input type="text" className="form-control"  placeholder="Name"  value={entryname} onChange={validateName}
         required  />
            
</div>
<div className="mb-3">

  <input type="text" className="form-control"  placeholder="Email" value={email} onChange={validateEmail}   required/>
 
</div>
<div className="mb-3">

  <input type="file" className="form-control"   onChange={handleFileChange} ref={fileInputRef} required/>
 
</div>
<div className="reg-grid">
  <button type="button" className="btn btn-primary btn-block" onClick={handleEntry}>Submit</button>
</div>
</form>
</div>
</div>
    </>
  );
}

export default GuestEntry;
