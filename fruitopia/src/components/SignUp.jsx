import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
     // initialize hooks
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [password,setPassword]=useState("");

    const [loading,setLoading]=useState("");
    const [success,setSuccess]=useState("");
    const [error,setError]=useState("");

    // function to send data to database
    const submit=async(e)=>{

    e.preventDefault()
    setLoading("Please wait as we try to sign you up")

    // sending data to the database

    try {
      
    const data=new FormData()

    data.append("username",username)
    data.append("email",email)
    data.append("phone",phone)
    data.append("password",password)

    // call our api

    const response=await axios.post('https://gavi.alwaysdata.net/api/signup',data)

    setLoading("")

    setSuccess(response.data.message)

    setUsername("")
    setEmail("")
    setPhone("")
    setPassword("")


    } catch (error){

      setLoading("")
      setError(error.message)

    }


  }


  return (
     <div    className='row justify-content-center mt-3'>
        <div    className='card shadow col-md-6 p-3'>
            
        <h1>Sign Up</h1>

        <form action="" onSubmit={submit}>
            <p  className='text-warning'>{loading}</p>
            <p  className='text-success'>{success}</p>
            <p  className='text-danger'>{error}</p>

            <input type="text"  placeholder='Enter your username' className='form-control' value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <br /> <br />

           <input type="email" placeholder='Enter your email'  className='form-control' required value={email}  onChange={(e)=> setEmail(e.target.value)}/>
          <br /> <br />

          <input type="tel" placeholder='Enter your phone number' className='form-control' required value={phone} onChange={(e)=> setPhone(e.target.value)}/>
         <br /> <br />

         <input type="password" placeholder='Enter your password' className='form-control' required value={password}  onChange={(e)=> setPassword(e.target.value)}/>
         <br /> <br />

         <input type="submit" value={"Sign up"}  className='w-100 form-control text-white bg-primary p-3' required/>
         <br />

            <b>Already Have an Account? <Link   to={"/signin"}  className='btn btn-outline-primary'>Sign In</Link></b>

        </form>

        </div>

    </div>

  )
}

export default SignUp