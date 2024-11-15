import React, { useState, useEffect } from 'react';
import { Modal, FloatingLabel, Form, Button } from 'react-bootstrap';
import { updateEmpAPI, getEditAPI } from '../services/allAPI';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // To redirect after updating
  const [empDetails, setEmpDetails] = useState({
    username: '',
    email: '',
    status: '',
  });
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    navigate('/'); // Redirect to Home after closing the modal
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const result = await getEditAPI(id); // Pass `id` to fetch the correct employee
        if (result.status >= 200 && result.status < 300) {
          setEmpDetails(result.data); // Populate the form with fetched data
        }
      } catch (err) {
        console.error('Error fetching employee details:', err);
      }
    };
    fetchEmployeeDetails();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { username, email, status } = empDetails;

    if (username && email && status) {
      try {
        const result = await updateEmpAPI(empDetails); 
        if (result.status >= 200 && result.status < 300) {
          alert('Employee details updated successfully!');
          handleClose();
        } else {
          console.error('Error updating employee:', result);
        }
      } catch (err) {
        console.error('Error during update:', err);
      }
    } else {
      alert('Please fill in all the fields!');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered style={{ marginTop: '5%' }}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="border rounded p-3">
          <FloatingLabel className="mt-2" controlId="floatingUrl" label="Enter Username*">
            <Form.Control
              name="username"
              value={empDetails.username}
              onChange={(e) => setEmpDetails({ ...empDetails, username: e.target.value })}
              type="text"
              placeholder="Enter Username"
            />
          </FloatingLabel>
          <FloatingLabel className="mt-2" controlId="floatingEmail" label="Enter Email*">
            <Form.Control
              name="email"
              value={empDetails.email}
              onChange={(e) => setEmpDetails({ ...empDetails, email: e.target.value })}
              type="email"
              placeholder="Enter Email"
            />
          </FloatingLabel>
          <FloatingLabel className="mt-2" controlId="floatingStatus" label="Select Status*">
            <Form.Select
              name="status"
              value={empDetails.status}
              onChange={(e) => setEmpDetails({ ...empDetails, status: e.target.value })}
              aria-label="Select Status"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Select>
          </FloatingLabel>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} className="btn btn-info" variant="primary">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
