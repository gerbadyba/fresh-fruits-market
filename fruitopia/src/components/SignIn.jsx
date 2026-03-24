import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios';

const SignIn =() =>{
// initialize hooks
const[email,setEmail]=useState("");
const [password,setPassword]=useState("");

// initialize other hooks for loading, success and error
const [loading,setLoading]=useState("");
const [success,setSuccess]=useState("");
const [error,setError]=useState("");

// hook used to navigate the user
const navigate=useNavigate();

// function that will send our data to the database
const submit=async(e)=>{

    e.preventDefault()
    setLoading("Please wait as we try to sign you in")

    // sending data to the database

    try {
      
    const data=new FormData()

    data.append("email",email)
    data.append("password",password)

    // function to call our api

    const response = await axios.post('https://gavi.alwaysdata.net/api/signin',data)

    setLoading("")
    
    if(response.data.user){
      // if user is found, store user details in local storage
      localStorage.setItem("user",JSON.stringify(response.data.user));
      setSuccess(response.data.message)

      // redirect to getproducts component
      setTimeout(()=>{

        navigate("/");
      },2000);
    }

    else{
      setError(response.data.message)

    }

    setEmail("")
    setPassword("")

    }catch (error){
      setLoading("")
      setError(error.data.message)

  }

}


  return (
    <div  className='row  justify-content-center mt-3'>
          
        <div  className='card shadow  col-md-6 p-3'>

          <h1>Sign In</h1>
          <form action="" onSubmit={submit}>

          {/* form control is used for responsiveness */}

          <p  className='text-warning'>{loading}</p>
          <p  className='text-success'>{success}</p>
          <p  className='text-danger'>{error}</p>

          <input type="email" placeholder='Email' className='form-control'  value={email} required  onChange={(e)=>setEmail(e.target.value)}/>
            <br /> <br />
          <input type="password" placeholder='Password' className='form-control'  value={password}  required  onChange={(e)=>setPassword(e.target.value)}/>
          <br /> <br />
          <input type="submit" value={"Sign in"}  className='w-100 form-control text-white bg-primary p-3' required/>
         <br />

          <b>Don't have an account? <Link to={"/signup"}  className='btn btn-outline-primary'>Sign Up</Link></b>

          </form>

        </div>
        
    </div>
  )
}

export default SignIn