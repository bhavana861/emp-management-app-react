import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Add from './Add';
import {getAllEmployeeAPI , removeEmpAPI } from '../services/allAPI'



const Home = () => {
const [allEMP,setAllEmp] = useState([]);

useEffect(()=>{
    getAllEmp();
},[])

const getAllEmp = async ()=>{
    try{
        const result = await getAllEmployeeAPI();
        if(result.status>=200 && result.status<300){
            setAllEmp(result.data);
        }
    }catch (err){
        console.log(err);
        

    }
}


const deleteEmp = async (id)=>{
    try{
     await removeEmpAPI(id)
    getAllEmp()
    }catch(err){
   console.log(err);
 
    }
   }
  return (
    <div style={{ width: '100%',marginLeft:"80px" }} className="mt-5">
      <div className="d-flex justify-content-start align-items-center mt-1 mb-4" style={{ marginLeft: '80px' }}>
        <Add />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginTop: '0px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f4f4f4' }}>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
           
          {allEMP.map((emp, index) => {
  return (
    <tr key={emp.id} style={{ height: '40px' }}>
      <td>{index + 1}</td>
      <td>{emp.username}</td>
      <td>{emp.email}</td>
      <td>{emp.status}</td>
      <td>
        <Link to={`/edit/${emp.id}`}>
          <i style={{ fontSize: '20px', marginLeft: '20px' }} className="fa-solid fa-pen-to-square"></i>
        </Link>
        <i onClick={()=>deleteEmp(emp?.id)} style={{ fontSize: '20px', marginLeft: '20px', color: 'red' }} className="fa-solid fa-trash"></i>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
