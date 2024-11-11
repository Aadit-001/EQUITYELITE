// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const useLogout = () => {
  // const navigate = useNavigate();
  const [isuserlogout,setisuserlogout] = useState(false);

  const logout = async () => {
    try {
      const res = await axios.get('https://equityelite.onrender.com/logout', {}, { withCredentials: true });
      console.log("logout succesfull");
      if(res.data.userLogout){
        setisuserlogout(true);
      }
      // navigate('/login');
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  // return logout;
  return { logout, isuserlogout };
};

export default useLogout;
