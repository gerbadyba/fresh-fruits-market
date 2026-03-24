import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';


const Mpesa = () => {

  const [loading,setLoading]=useState("");
  const [success,setSuccess]=useState("");
  const [error,setError]=useState("");

  const [phone,setPhone]=useState("");
 
  const {product}=useLocation().state || {}

    const images_url="https://gavi.alwaysdata.net/static/images/"
  
  const submit= async(e)=> {

    e.preventDefault()
    setLoading("Please wait as we process your payment")

    try{

      const data = new FormData();

      data.append("phone",phone)
      data.append("amount",product.product_cost)

      const response = await axios.post("https://gavi.alwaysdata.net/api/mpesa_payment",data)
      setLoading("");      
      setSuccess(response.message)


    } catch (error){
      setLoading("")
      setError(error.message)

    }

  }
  return (
    <div  className='row  justify-content-center'>

      <h1 className='mt-4'>Mpesa Payments-Lipa na mpesa</h1>

      <p  className='text-primary'>{product.product_name}</p>
      <img src={images_url + product.product_photo} alt="" className='product_img mt-5'/>
        <br />
      <p  className='text-secondary'>{product.product_description}</p>
      <p  className='text-success'>{product.product_cost}</p>


      <div  className='col-md-6'>

        <form action=""   onSubmit={submit}>

          <p  className='text-warning'>{loading}</p>
          <p  className='text-success'>{success}</p>
          <p  className='text-danger'>{error}</p>

          <input type="tel" className='form-control'  placeholder='Enter Your Phone number Starting with 254' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
          <br />

          <input type="submit" className='btn btn-primary w-100 p-3'  value={"Make Payments"}/>




        </form>



      </div>
        
    </div>
  )
}

export default Mpesa