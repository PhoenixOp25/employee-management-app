import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../apiService';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <p>No Employees in the system.</p>
      ) : (
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>
              <Link to={`/employee/${employee._id}`}>
                {employee.name} ( emp_id: {employee._id} )
              </Link>
              <button onClick={() => handleDelete(employee._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <Link to="/add-employee" className="add-employee-button">Add New Employee</Link>
    </div>
  );
};

export default EmployeeList;
