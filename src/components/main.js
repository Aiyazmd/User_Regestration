import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
const Main = () => {
    let navigate = useNavigate();
    const handleLogin=()=>{
        navigate("/login")
    }

    const handleCreateAccount=()=>{
      navigate("/createUser")
    }
  return (
    <>
    <div className="container">
    <div >
      <div className='display-content'>
        <h2>Welcome to PopX</h2>
        <p style={{width:"200px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        <div>
        <Button className="fill-btn m-0 ms-6 submit-spinner" style={{marginBottom:"10px"}} onClick={handleCreateAccount}> Create Account</Button>
        
        <Button className="fill-btn m-0 ms-6 submit-spinner"  onClick={handleLogin}> Already Registered? Login</Button>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Main