import React,{useState} from 'react'
import axios from 'axios'


export const Admin = ({notify}) => {
    const [miners, setminers] = useState([])
    const [passkey,setpassKey] = useState("")
    const submitHandler=async()=>{

        try {
            if(passkey == "")
            alert("Please enter passkey")

            let res = await axios.post('https://proof-of-elapsed-time.vercel.app/getminers',{passKey:passkey});
            if(res.status != 200) throw new Error(res.data)
            setminers(res.data)
            

        } catch (error) {
            console.log(error)
            notify(error.message,"error")
        }
    } 
    
    const approveMiner=async(email)=>{
        try {
            let res = await axios.post('https://proof-of-elapsed-time.vercel.app/approveminer',{email:email});
            submitHandler();
        } catch (error) {
            console.log(error)   
        }
    }
    const rejectMiner=async(email)=>{
        try {
            let res = await axios.post('https://proof-of-elapsed-time.vercel.app/rejectminer',{email:email});
            submitHandler();
        } catch (error) {
            console.log(error)   
        }
    }

  return (

    <div style={{width:"100%",height:"100vh"}} className="Container">
        <div className='big-container admin'>
        <div class="form-group">
    <label for="exampleInputEmail1">Pass Key</label>
    <input type="email" id="passkey"  className="form-control"   aria-describedby="emailHelp" placeholder="Enter passkey" onChange={e=>setpassKey(e.target.value)}/>
    <button className='btn btn-primary' onClick={submitHandler}>Submit</button>
 </div>
        {miners?.map((ele)=>{ return <div className='miners'>
            <div className="email">{ele.email}</div>
            <div className="buttons">
                <button className='btn btn-success' onClick={e=>approveMiner(ele.email)}>Approve</button>
                <button className='btn btn-danger m-2' onClick={e=>rejectMiner(ele.email)}>Reject</button>
            </div>
        </div>})}
        </div>

    </div>
  )
}
