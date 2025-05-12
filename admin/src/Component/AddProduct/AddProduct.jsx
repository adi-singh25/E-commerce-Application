// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';


const AddProduct = () => {


    const [image,setImage]=useState(false);

    const [productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler=(e)=>{
        setImage(e.target.files[0]);
    }

    // updating the the database  by adding the value

    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    // arrow function for the  the add button

    const Add_Product=async ()=>{
        console.log(productDetails)
        let responseData;
        let product=productDetails;
        let formData=new FormData();
        formData.append('product',image);

        await fetch('https://e-commerce-mernappbackend-1.onrender.com/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,




        }).then((resp)=>resp.json()).then((data)=>{responseData=data});
        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch('https://e-commerce-mernappbackend-1.onrender.com/addproduct',{
                method:'Post',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
               body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("product Added"):alert("failed")
            })
        }
    }




    /*

    What is the purpose of using FormData in this component?
   Answer: FormData is used to construct a set of key/value pairs representing form fields and their values. In this case, it allows the component to send the image file (along with other form data,
    if needed) in a format that is suitable for multipart/form-data requests, which is required for file uploads.

    */

    // 4. How do you handle the asynchronous nature of API calls in the Add_Product function?
// Answer: The Add_Product function is defined as an asynchronous function using the async keyword. It makes two fetch calls:

// The first fetch uploads the image file to the server and awaits the response. The success status and image URL are checked to proceed.
// If successful, the image URL is added to the product object, which is then sent to the second fetch call to add the product details to the database. The use of await ensures that each step completes before moving to the next, maintaining proper flow.
  return (
    <div className='add-product'>

        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input  value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
        </div>

        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price}  onChange={changeHandler}  type="text" name="old_price" placeholder='Type here'/>
            </div>

            <div className="addproduct-itemfield">
                <p> Offer Price</p>
                <input  value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here'/>
            </div>
        </div>

        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select   value={productDetails.category} onChange={changeHandler} name="category"  className='add-product-selector'>
                <option value="women" >Women</option>
                <option value="men" >Men</option>
                <option value="kid" >Kid</option>

            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=""/>
            </label>
            <input onChange={imageHandler}type="file" name='image' id='file-input' hidden/>
        </div>

          {/* Renders the form fields for product input and an "ADD" button that triggers the Add_Product function. */}
        <button  onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
     
    </div>
  );
}

export default AddProduct;
