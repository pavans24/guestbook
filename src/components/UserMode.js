import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './UserMode.css';
import GuestIn from './GuestIn'; 
import AdminLogin from './AdminLogin'
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';

function UserMode(){
  
  const navigate = useNavigate();

  const cookieValue = Cookies.get('username');
  const adminCookie = Cookies.get('adminname');
  
      const showGuestBlock = (e) => {
        if(cookieValue){
          console.log(cookieValue);
          navigate('/guest/entry'); 
        }
        else{
        navigate('/guest'); 
        }
      };

      const showAdminBlock = (e) => {
        if(adminCookie){
          console.log(adminCookie);
          navigate('/dashboard'); 
        }
        else{
        navigate('/admin'); 
        }
      };
        
    return(
     
       <>
       <div className='background' id='init-step'><div className='user-block'>
            <p className='header'><span className='text-muted'>Please Select your</span> <span>Mode</span></p>
            <div className='flex-center'>
                <div>
                    <button className='btn btn-primary' onClick={showGuestBlock}>Guest</button>
                    </div>
                  <div> 
                  <Link to="/admin">
                    <button className='btn btn-primary' onClick={showAdminBlock}>Administrator</button>
                    </Link>
                    </div>
                    </div>
              
            </div>
             </div> 
          
       
       </>
       
    );

}
export default UserMode;