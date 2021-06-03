import React, {useEffect, useState} from 'react';
import Nev from '../components/Nev';
import axios from '../axios';
import FormData from 'form-data';


const Regis = () => {
  useEffect(() => {
    document.querySelector(".img-btn").addEventListener("click", function () {
      document.querySelector(".cont").classList.toggle("s-signup");
      
    });
  }, []);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [shopname, setShopname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEmail] = useState("");



  const onSignup=()=>{
    const formData = new FormData();
    formData.append("shopname",shopname);
    formData.append("username",username);
    formData.append("password",password);
    formData.append("email",Email);
    axios.post("/SignupServlet", formData).then((res)=>{window.location.href="/home"});}

    const onSignin=()=>{
      const formData = new FormData();
      formData.append("username",username);
      formData.append("password",password);
      axios.post("/SigninServlet", formData).then((res)=>{window.location.href="/home"});}
  


 
  return (
    <div>
      <Nev header="Check Stock"/>
    <div className="regis">
      <div class="cont">
        <div class="form sign-in">
          <h2>Sign In</h2>
          <label>
            <span>Username</span>
            <input type="text" name="email"  onChange={e=>setUsername(e.target.value)}/>
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" onChange={e=>setPassword(e.target.value)} />
          </label>
          <button class="submit" type="button" onClick={onSignin}>
            Sign In
          </button>
        </div>

        <div class="sub-cont">
          <div class="img">
            <div class="img-fade">
            <div class="img-text m-up">
              <h2>New here?</h2>
              <p>Sign up and discover great amount of new opportunities!</p>
            </div>
            <div class="img-text m-in">
              <h2>One of us?</h2>
              <p>
                If you already has an account, just sign in. We've missed you!
              </p>
              </div>
            </div>
            <div class="img-btn">
              <span class="m-up">Sign Up</span>
              <span class="m-in">Sign In</span>
            </div>
          </div>
          <div class="form sign-up">
            <h2>Sign Up</h2>
            <label>
              <span>Shop Name</span>
              <input type="text" onChange={e=>setShopname(e.target.value)} />
            </label>
            <label>
              <span>Name</span>
              <input type="text" onChange={e=>setUsername(e.target.value)} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" onChange={e=>setEmail(e.target.value)}/>
            </label>
            <label>
              <span>Password</span>
              <input type="password" onChange={e=>setPassword(e.target.value)}/>
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" />
            </label>
            <button type="button" class="submit" onClick={onSignup}>
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Regis;
