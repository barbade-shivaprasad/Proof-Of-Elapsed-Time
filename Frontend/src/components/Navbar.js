import { Button } from "@mui/material";
import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import HardwareIcon from '@mui/icons-material/Hardware';
import TimerIcon from '@mui/icons-material/Timer';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";



export const Navbar = ({data,setdata}) => {
  const navigate = useNavigate();

  const loginLogout = ()=>{
    if(data!=null)
    setdata(null)
    else
    navigate('/login')
  }


  return (
    <div>
      <nav class="navbar nav">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 my-2 mx-4 h1">
            <span className="center">
            <TimerIcon/>
            Proof of elapsed time
            </span>
        </span>
          <span className="homeButton1 center">
          <span className="homeButton mx-2" onClick={e=>navigate('/')}><HomeIcon sx={{marginRight:"3px"}}/>Home </span>
          <span className="homeButton mx-2" onClick={e=>navigate('/about')} ><InfoIcon sx={{marginRight:"3px"}}/>About </span>
          <span className="homeButton mx-2" onClick={e=>navigate('/mine')} ><HardwareIcon sx={{marginRight:"3px"}}/>Mine </span>
          <span className="homeButton mx-2" onClick={e=>loginLogout()} >
            
            {data!=null?<><LogoutIcon sx={{marginRight:"3px"}}/>Logout</>: <><LoginIcon sx={{marginRight:"3px"}}/>Login</>}
            
          </span>
          </span>
          

        </div>
      </nav>
    </div>
  );
};
