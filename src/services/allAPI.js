import commonAPI from './commonAPI';
import SERVERURL from './serverURL';

export const saveEmployeeAPI = async (empDetails) => {
  return commonAPI('POST', `${SERVERURL}/employeeDetails`, empDetails);
};

export const getAllEmployeeAPI = async () => {
  return commonAPI('GET', `${SERVERURL}/employeeDetails`, '');
};

export const removeEmpAPI = async (id) => {
  return commonAPI('DELETE', `${SERVERURL}/employeeDetails/${id}`, {});
};

export const getEditAPI = async (id) => {
  return commonAPI('GET', `${SERVERURL}/employeeDetails/${id}`, ''); 
};

export const updateEmpAPI = async (empDetails) => {
  return commonAPI('PUT', `${SERVERURL}/employeeDetails/${empDetails.id}`, empDetails); 
};
