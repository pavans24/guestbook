import React from 'react';
import './UserMode.css';
export default function UserMode(){
    return(
        <div className='background'>
            <div className='user-block'>
            <p>Select your Mode</p>
                <div>
                <button>Guest</button>
                </div>
                <div>
                <button>Administrator</button>
                </div>
            </div>
        </div>
    );
}