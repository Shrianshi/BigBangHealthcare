// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [username, usernameupdate] = useState("");
  const [useremail, useremailupdate] = useState("");
  const [password, passwordupdate] = useState("");
  const [Role, Roleupdate] = useState("");

  console.log(useremail);
  console.log(Role);

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);


  const Register = (e) => {
    e.preventDefault();
    if (validate()) {
      let inpobj = {
        userName: username,
        UserEmail:useremail,
        password: password,
        Role:Role
      };
      fetch("https://localhost:7127/api/User", {
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
            toast.error("Login failed, invalid credentials");
          } else {
            toast.success("Success");
            window.alert("Registered Sucessfully");
            usenavigate("/");
          }
        })
        .catch((err) => {
          window.alert("invalid credentials");
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
      <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
        <form onSubmit={Register} className="container">
          <div className="card">
            <div className="card-header">
              <h2>Register</h2>
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
                  Email <span className="errmsg">*</span>
                </label>
                <input
                  value={useremail}
                  onChange={(e) => useremailupdate(e.target.value)}
                  className="form-control" autoComplete="off"
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

              <div class="form-group">
                <label for="exampleDropdown">Role</label>
                <select class="form-control" id="exampleDropdown" onChange={(e) => Roleupdate(e.target.value)} required>
                  <option value="">--Role--</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>

            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                submit
              </button>
              <button className=""><Link class="nav-link active" aria-current="page" to="/">Logout</Link></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
