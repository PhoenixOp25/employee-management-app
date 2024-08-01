import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import { createEmployee } from './apiService';

const App = () => (
  <Router>
    <Routes>
    <Route path="/" element={<EmployeeList />} />
    <Route path="/employee/:id" element={<EmployeeDetails />} />
      <Route path="/add-employee" element={<AddEmployee createEmployee={createEmployee} />} />
    </Routes>
  </Router>
);

export default App;
