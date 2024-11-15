import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Edit from './components/Edit';
import Add from './components/Add';

function App() {
  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center'}}>Employment Management App</h1>
        <Home />
      </Container>

      <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/add" element={<Add />} />
    <Route path="/edit/:id" element={<Edit />} />
</Routes>
    </>
  );
}

export default App;
