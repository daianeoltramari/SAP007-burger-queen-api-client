import { useState } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TokenAndRole } from '../../services/storage';

const FormLogin = () => {
  const [error, setError] = useState(""); //useState: estado inicial vazio 
  const [items, setItems] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    return setItems(() => {
      const copyItems = { ...items };
      copyItems[e.target.name] = e.target.value; // pegando o valor do email e da senha
      return copyItems;
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser("/auth", items) // "/auth" pq estou autenticando o usúario.
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 400:
            setError("E-mail e/ou senha inválidos!");
            break;
          default:
            setError("Ops! Tente novamente mais tarde.");
        }
      })
      .then((data) => {
        if (data.role === "attendant") {
          TokenAndRole(data.token, data.role); // pegando token e role para validação
          navigate("/menu");
        } else if (data.role === "chef") {
          TokenAndRole(data.token, data.role); 
          navigate("/kitchen");
        }
      })
      .catch((error) => {
        //Erro de comunicação do fetch com a api
      });
  };

  return { handleChange, handleSubmit, error };
};

export default FormLogin;
