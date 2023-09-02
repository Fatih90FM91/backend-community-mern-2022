import React from 'react';
import { baseUrl } from '../components/Login';

const LogOut = () => {

    window.localStorage.clear();
    window.location.href = "login"; 
  

  return (
    <div>
        <h1>Good bye Our Dear Costumerr..!!</h1>
    </div>
  )
}

export default LogOut