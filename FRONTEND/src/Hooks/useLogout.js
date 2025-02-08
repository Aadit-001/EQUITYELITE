// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState ,useContext} from 'react';
// import GlobalContext from '../GlobalContext';

const useLogout = () => {
  // const navigate = useNavigate();
  const [isuserlogout,setisuserlogout] = useState(false);
  // const [globalVariable,setGlobalVariable] = useContext(GlobalContext);

  const logout = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/logout`, {}, { withCredentials: true });
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
