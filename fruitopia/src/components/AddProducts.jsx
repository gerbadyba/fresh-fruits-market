import React, { useState } from 'react'

import axios from 'axios';

const AddProducts = () => {

  // initialize hooks
  const[product_name,setProductname]=useState("");
  const[product_description,setProductdescription]=useState("");
  const[product_cost,setProductcost]=useState("");
  const[product_photo,setProductphoto]=useState("");

  // initialize other hooks for loading,success and error
  const[loading,setLoading]=useState("");
  const[success,setSuccess]=useState("");
  const[error,setError]=useState("");

    // function that will send our data to the database
  const submit = async (e)=>{

    e.preventDefault();
    setLoading("Please wait as we upload your product...")

    // sending data to the database
    try{

      const data = new FormData();

      data.append("product_name",product_name);
      data.append("product_description",product_description);
      data.append("product_cost",product_cost);
      data.append("product_photo",product_photo)

      const response=await axios.post('https://gavi.alwaysdata.net/api/addproducts',data);
      setLoading("")

      setSuccess(response.data.message)

      console.log(response)

      setProductname("");
      setProductdescription("");
      setProductcost("");
      setProductphoto("")

    }catch(error){

      setError(error.message)

    }

  }
  return (
    <div  className='row justify-content-center mt-4'>

      <div  className='card shadow col-md-6 p-4'>

        <h1>Upload Products</h1>

          <p  className='text-warning'>{loading}</p>
          <p  className='text-success'>{success}</p>
          <p  className='text-danger'>{error}</p>

        <form action="" onSubmit={submit}>
          
          {/* {product_name} */}
          <input type="text" placeholder='Enter Product name' className='form-control' value={product_name} onChange={(e)=>setProductname(e.target.value)} required/>
          <br /> <br />
          
          <textarea placeholder='Describe your Product' className='form-control' value={product_description} onChange={(e)=>setProductdescription(e.target.value)}  required></textarea>
          <br /> <br />

          <input type="text" placeholder='Enter Product Cost' className='form-control'  value={product_cost}  onChange={(e)=> setProductcost(e.target.value)} required/>
          <br /> <br />

          <b>Upload Product photo</b>

          <input type="file" className='form-control' onChange={(e)=>setProductphoto(e.target.files[0])}  required  accept='image/'/>
          {/* value = product photo*/}
          <br /> <br />

          <input type="submit" value={"Upload Product"}className='w-100 form-control  text-white  btn bg-primary p-3'/>
          <br /> <br /> 

        </form>
      </div>  
    </div>
  )
}

export default AddProducts