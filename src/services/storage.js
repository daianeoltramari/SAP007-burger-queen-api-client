export const URL = 'http://lab-api-bq.herokuapp.com';

export const TokenAndRole = (token, role) => {
  localStorage.setItem('token', token); // criando token
  localStorage.setItem('role', role); // criando funçao do colaborador
}

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');