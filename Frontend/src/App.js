import React,{useState} from "react";
import Main from "./components/Main";
import { Navbar } from "./components/Navbar";
import Landing from "./components/Landing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route,Switch } from 'react-router-dom';
import { About } from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Admin } from "./components/Admin";

function App() {

  const [data, setdata] = useState(null);

  console.log(data)
    const notify=(message,type)=>{
        if(type=="success")
        toast.success(message)
        else
        toast.error(message)
    }

  return (

    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Navbar data={data} setdata={setdata}/>
  
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin notify={notify}/>} />
        <Route path="/mine" element={<Main notify={notify} data={data} setdata={setdata}/>} />
        <Route path="/login" element={<Login notify={notify} data={data} setdata={setdata}/> }/>
        <Route path="/signup" element={<Signup notify={notify} data={data} setdata={setdata}/> }/>
      </Routes>
  </Router>
      
  );
}

export default App;
