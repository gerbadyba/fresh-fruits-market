import React from 'react'

import { useState, useEffect } from 'react'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'


const GetProducts = () => {

  // initialize our hooks
  const[loading,setLoading]=useState("");
  const[error,setError]=useState("");
  const [search, setSearch] = useState("");
  // [] shows a list of products stored that are in form of a list
  const[products,setProducts]=useState([]);

  const navigate = useNavigate()

  const images_url="https://gavi.alwaysdata.net/static/images/"

  // function to fetch/get data from the api
  const fetchProducts=async()=>{

    setLoading("Please wait as we retrieve the available products")

    try{

    // call our api
    const response=await axios.get("https://gavi.alwaysdata.net/api/getproductsdetails")
    
    console.log("The response is",response);

    setProducts(response.data)

    setLoading("")
    
    } catch(error){
      setLoading("")
      setError(error.message)
    }
    
  }
  // end of function where we call useEffect

  useEffect(()=>{
    fetchProducts()
  },[])

  return (
    <div  className='row'>

      <h1 className='m-4 '>Purely Organic. Perfectly Fresh</h1>

      {/* SEARCH BAR */}
        <div className="mb-3 text-center">
        <input type="text"    className="form-control w-50 mx-auto"   placeholder="Search for a product..."   value={search}    onChange={(e) => setSearch(e.target.value)}/>
        </div>

      <p  className='text-info'>{loading}</p>
      <p  className='text-danger'>{error}</p>

          <h1 className='text-start' style={{ textDecoration: 'overline' }}>Fruits</h1>

      {/* calling .map and filter to iterate/loop through each item */}

      {products.filter((product) =>
        product.product_name.toLowerCase().includes(search.toLowerCase())
      )
      .map((product) =>(
          // fruits UI

      <div  className='justify-content-center col-md-3  mb-4 ' key={product.id}>
        
        {/* added 'custom-card' and removed 'shadow'*/}

        <div  className='card custom-card m-2'>

          <div  className='card-body p-1'>

            <p  className='card-header text-dark'>{product.product_name}</p>
            <img src={images_url + product.product_photo} alt="" className='product_img mt-5'/>
              <br />
            <p  className='card-body text-dark'>{product.product_description}</p>
            <p  className='card-footer text-success'> KSH {product.product_cost}</p>

            {/* {state:{product}} */}
            <input type="button" className='btn btn-primary '  value={"Purchase Now"}  onClick={()=>navigate("/mpesa" ,{state:{product}})}/> <br /> <br />

          </div>

        </div>
        </div>   
      
      // the below maps the entire div
      ))}

    </div>

  )

}

export default GetProducts