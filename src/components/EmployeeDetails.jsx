import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEmployeeById } from '../apiService';
import './EmployeeDetails.css'; // Import the CSS file

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID from useParams:", id); // Debugging line

    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployee();
    } else {
      console.error('No ID provided in the URL.');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="employee-details-container">
      <h1>Employee Details</h1>
      {employee ? (
        <div>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Address:</strong> {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip_code}</p>
          <p><strong>Contact Methods:</strong> {employee.contact_methods.map(cm => `${cm.contact_method}: ${cm.value}`).join(', ')}</p>
        </div>
      ) : (
        <p>Employee not found.</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
