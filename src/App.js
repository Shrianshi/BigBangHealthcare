import logo from "./logo.svg";
import "./App.css";
import { PatientDataView } from "./Components/PatientDataView";
import DoctorDataView from "./Components/DoctorDataView";

import { Home } from "./Components/Home";
import { Home1 } from "./Components/Home1";
import { Home2 } from "./Components/Home2";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import Register from "./Components/Register";
import { Doctor } from "./Components/Doctor";
import Blog from "./Components/Blog";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
      <Routes>     
      <Route path="/" element={<Login></Login>}/>
        <Route path="/Home" element={<Home></Home>}/>
        <Route path="/Home1" element={<Home1></Home1>}/>
        <Route path="/Home2" element={<Home2></Home2>}/>
        <Route path="/patient" element={<PatientDataView/>} />
        <Route path="/doctor" element={<DoctorDataView />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blog />} />
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
