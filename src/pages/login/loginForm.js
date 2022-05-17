import { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TokenAndRole } from "../../Local/localStorag";
//import { apiResponse } from '../../services/validate';


const useFormLogin = () => {
  const [items, setItems] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    return setItems(() => {
      const copyItems = { ...items };
      copyItems[e.target.name] = e.target.value;
      return copyItems;
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser('auth', items)
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        case 400:
          console.log('Falta algo a ser preenchido!');
          break;
        case 403:
          console.log('E-mail já cadastrado');
          break;
        default:
      }
    })
      .then((data) => {
        if (data.role === 'attendant') {
          TokenAndRole(data.token, data.role);
          navigate('/menu');
        } else if (data.role === 'chef') {
          TokenAndRole(data.token, data.role);
          navigate('/kitchen');
        }
      })
      .catch((error) => {
        //Erro de comunicação do fetch com a api
      });
  };

  return { handleChange, handleSubmit };
};

export default useFormLogin;