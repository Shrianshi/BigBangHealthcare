import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import jwt_decode from "jwt-decode";

export const Login = () => {
  const [username, usernameupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      if (username === "Shri") {
        if (password === 1234) {
          usenavigate("/Home");
        } else {
          window.alert("Incorrect password");
        }
      } else {
        window.alert("Incorrect Username");
      }
    }
  };
  
  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      let inpobj = {
        userName: username,
        password: password,
      };
      let inputobj = { username: username, password: password };
      fetch("https://localhost:7127/api/Token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inpobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            window.alert("invalid credentials");
            toast.error("Login failed, invalid credentials");
          }
           else {
            toast.success('Login successful!');
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.token);
            console.log(resp.token);
            const decodedToken = jwt_decode(resp.token);
            console.log(decodedToken);
            const role =
              decodedToken[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ];
            console.log(role); 
            if(role==='patient')
            {
              usenavigate("/Home1");
            }
            else if(role==='doctor')
            {
              usenavigate("/Home2");
            }
            else{
                usenavigate("/Home");
            }
            
          }
        })
        .catch((err) => {
          //window.alert("Login Failed due to :" + err.message);
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
    }
    if (password === "" || password === null) {
      result = false;
    }
    return result;
  };

  return (
    <div className="row">
      <ToastContainer />
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={ProceedLoginusingAPI} className="container">
          <div className="card  bg-success-subtle">
            <div className="card-header">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  value={username}
                  onChange={(e) => usernameupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordupdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login
