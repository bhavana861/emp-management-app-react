import React, { useState } from 'react';
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';
import { saveEmployeeAPI} from '../services/allAPI'


const Add = () => {
    const [employeeId, setEmployeeId] = useState(1)
 
    const [empDetails,SetEmpDetiles] = useState({
        username:"",email:"" ,status:""
      })
      console.log(empDetails );

      
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleEmp = async(event)=>{
    event.preventDefault();
    const{username,email,status} = empDetails
    if(username && email && status){
        try{
            const result = await saveEmployeeAPI(empDetails)
            console.log(result);
            handleClose(); 
        
            if(result.status>=200 && result.status<300){
                alert("employee details addedd successfully!!!")
            }else{
                console.log(result);
                
            }
            
        }catch(err){
            console.log(err);
            
        }
    }else{
        alert("Please fill the form!!!")
    }
}

  return (
    <>
      <div className="d-flex align-items-center justify-content-start">
        <h3 className="mb-0 me-3" style={{ color: 'green' }}>
          Add Employee Details{' '}
          <button onClick={handleShow} style={{ backgroundColor: 'green', fontSize: '28px', borderRadius: '7px',color:'white',alignItems:'center' }}>
            +
          </button>
        </h3>
        {/* Modal */}
    
            <Modal show={show}  onHide={handleClose} backdrop="static" keyboard={false}centered style={{ marginTop: '5%' }}>
              <Modal.Header closeButton>
            <Modal.Title>Add Employee Details!!!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="border rounded p-3">
                {/* <FloatingLabel controlId="floatingCaption" label="Enter ID*">
                  <Form.Control type="text" placeholder="Enter ID" value={employeeId} readOnly   />
                </FloatingLabel> */}
                  <FloatingLabel className="mt-2" controlId="floatingUrl" label="Enter User name*">
             
                    <Form.Control name="username" onChange={e=>SetEmpDetiles({...empDetails,username:e.target.value})} type="text" placeholder="Enter User name" />
                  </FloatingLabel>
                  <FloatingLabel className="mt-2" controlId="floatingUrl" label="Enter e-mail*">
                    <Form.Control name="email" onChange={e=>SetEmpDetiles({...empDetails,email:e.target.value})} type="email" placeholder="Enter e-mail" />
                  </FloatingLabel>
                  <FloatingLabel className="mt-2" controlId="floating" label="">
                    <Form.Select name="status" onChange={e=>SetEmpDetiles({...empDetails,status:e.target.value})} aria-label="Select status">
                        <option >Select Status*</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleEmp} className="btn btn-info" variant="primary">
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
  
      </div>
    </>
  );
};

export default Add;
