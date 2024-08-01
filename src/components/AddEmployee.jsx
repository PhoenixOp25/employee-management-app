import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../apiService';
import './AddEmployee.css';

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    address: {
      line1: '',
      city: '',
      country: '',
      zip_code: ''
    },
    contact_methods: []
  });
  const [employeeId, setEmployeeId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setEmployeeData({ 
      ...employeeData, 
      address: { ...employeeData.address, [e.target.name]: e.target.value }
    });
  };

  const handleContactChange = (index, e) => {
    const updatedContacts = employeeData.contact_methods.map((contact, i) => 
      i === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setEmployeeData({ ...employeeData, contact_methods: updatedContacts });
  };

  const addContactMethod = () => {
    setEmployeeData({ 
      ...employeeData, 
      contact_methods: [...employeeData.contact_methods, { contact_method: '', value: '' }]
    });
  };

  const removeContactMethod = (index) => {
    const updatedContacts = employeeData.contact_methods.filter((_, i) => i !== index);
    setEmployeeData({ ...employeeData, contact_methods: updatedContacts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createEmployee(employeeData);
      const newEmployeeId = response.data._id || response.data.id;
      if (newEmployeeId) {
        setEmployeeId(newEmployeeId); // Store the employee ID
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Invalid response structure:', response);
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      navigate('/');
    }
  };

  return (
    <div className="add-employee-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            name="name" 
            value={employeeData.name} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label>Address Line 1:</label>
          <input 
            type="text" 
            name="line1" 
            value={employeeData.address.line1} 
            onChange={handleAddressChange} 
          />
        </div>
        <div>
          <label>City:</label>
          <input 
            type="text" 
            name="city" 
            value={employeeData.address.city} 
            onChange={handleAddressChange} 
          />
        </div>
        <div>
          <label>Country:</label>
          <input 
            type="text" 
            name="country" 
            value={employeeData.address.country} 
            onChange={handleAddressChange} 
          />
        </div>
        <div>
          <label>ZIP Code:</label>
          <input 
            type="text" 
            name="zip_code" 
            value={employeeData.address.zip_code} 
            onChange={handleAddressChange} 
          />
        </div>
        <div>
          <h3>Contact Methods</h3>
          {employeeData.contact_methods.map((contact, index) => (
            <div key={index} className="contact-method">
              <label>Contact Method:</label>
              <select 
                name="contact_method" 
                value={contact.contact_method} 
                onChange={(e) => handleContactChange(index, e)}
              >
                <option value="">Select</option>
                <option value="EMAIL">EMAIL</option>
                <option value="PHONE">PHONE</option>
              </select>
              <label>Value:</label>
              <input 
                type="text" 
                name="value" 
                value={contact.value} 
                onChange={(e) => handleContactChange(index, e)}
              />
              <button type="button" className="remove-contact-button" onClick={() => removeContactMethod(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addContactMethod}>Add Contact Method</button>
        </div>
        <button type="submit">Add Employee</button>
      </form>
      {employeeId && (
        <div className="employee-id">
          <h3>Employee ID: {employeeId}</h3>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
