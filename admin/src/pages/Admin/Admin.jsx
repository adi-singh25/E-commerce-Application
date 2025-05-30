// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Admin.css';
import Sidebar from '../../Component/Sidebar/Sidebar';
import {Routes,Route} from 'react-router-dom';
import AddProduct from '../../Component/AddProduct/AddProduct';
import ListProduct from '../../Component/ListProduct/ListProduct';

import OrderplacedList from '../../Component/OrderplacedList/OrderplacedList';

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/listproduct' element={<ListProduct/>}/>
          <Route path='/orderplacedList' element={<OrderplacedList />} /> 

        </Routes>


      
    </div>
  );
}

export default Admin;
