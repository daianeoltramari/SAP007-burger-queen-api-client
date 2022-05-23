import { URL, getToken } from './storage.js';

//Criar usúario
export const createUser = (endpoint, items) => {
  return fetch(`${URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: items.name,
      email: items.email,
      password: items.password,
      role: items.role,
      restaurant: "CÊ que sabe",
    }),
  });
};

//Login
export const loginUser = (endpoint, items) => {
  return fetch(`${URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: items.email,
      password: items.password,
    }),
  });
};

//Buscar os produtos
export const getProducts = (endpoint) => {
  return fetch(`${URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then((res) => res.json());
};

//Cria o pedido
export const sendOrder = (endpoint, orderInfo, items) => {
  return fetch(`${URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify({
      client: orderInfo.client,
      table: orderInfo.table,
      products: items,
    }),
  });
};

//Manda para cozinha e pedidos prontos
export const getOrders = (endpoint) => {
  return fetch(`${URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
  }).then((res) => res.json());
};

//Modifica o status do pedido
export const updateOrderStatus = (endpoint, id, status) => {
  id = id.toString();
  return fetch(`${URL}${endpoint}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST",
    },
    body: JSON.stringify({
      status,
    }),
  }).then((res) => res.json());
};
