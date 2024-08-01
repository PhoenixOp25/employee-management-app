// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://free-ap-south-1.cosmocloud.io/development/api'; // Replace with your API base URL
const PROJECT_ID = '66aa062d39e2fdc09bbba2f2'; // Your actual project ID
const ENVIRONMENT_ID = '66aa062d39e2fdc09bbba2f3'; // Your actual environment ID

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'projectId': PROJECT_ID,
      'environmentId': ENVIRONMENT_ID,
     'Content-Type': 'application/json',
    }
  });
  



  export const getEmployees = async (limit = 10, offset = 0) => {
    const response = await api.get('/emp', {
      params: { limit, offset }
    });
    return response.data;
  };
  
  export const createEmployee = async (employeeData) => {
    try {
      const response = await api.post('https://free-ap-south-1.cosmocloud.io/development/api/emp', employeeData, {
        headers: {
          'Project-ID': PROJECT_ID,
          'Environment-ID': ENVIRONMENT_ID,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
    //   console.error('Error adding employee:', error.response ? error.response.data : error.message);
    //   throw error;
        console.log(error);
    }
  };
  
  export const getEmployeeById = async (id) => {
    try {
      console.log(`Fetching employee with ID: ${id}`); // Log the ID for debugging
      const response = await api.get(`/emp/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee by ID:', error.response || error.message);
      throw error; // Re-throw the error to handle it in the component
    }
  };
  export const updateEmployee = async (id, employeeData) => {
    const response = await api.put(`/emp/${id}`, employeeData);
    return response.data;
  };
  
  export const patchEmployee = async (id, employeeData) => {
    const response = await api.patch(`/emp/${id}`, employeeData);
    return response.data;
  };
  
  export const deleteEmployee = async (id) => {
    try {
      // Sending a DELETE request with the id in the URL and an empty object in the body
      const response = await api.delete(`emp/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {}
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting employee:', error.response || error.message);
      throw error; // Re-throw the error to handle it in the component
    }
  };
  