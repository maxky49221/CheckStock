import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../axios';


const Nevbar = ({ header, noButton = false}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const logout = async()=>{
    await axios.get("/SignoutServlet");
  }
  return (
    <div className="header">
      <h1 className="text">{header}</h1>
      
      <div onClick={logout}>
               <Link to="/" className="login" >
               logout
             </Link>
             </div>
     
    </div>
  );
};

export default Nevbar;
