import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userData } from "./userStorage";

// function takes component and redirects to login page if there is no jwt token in local storage 
const Protector = ({children}) => {
  const navigate = useNavigate();
  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate('/login');
    }
  }, [navigate, jwt]);

  return jwt ? children : null;
}

export default Protector;
