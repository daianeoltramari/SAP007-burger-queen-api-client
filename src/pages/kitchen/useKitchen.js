import { useState } from 'react';
import { getOrders, updateOrderStatus } from '../../services/api';
import { getRole } from '../../services/storage';

const useKitchen = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [error, setError] = useState('');

  //Pegando o pedido da API e ordenando
  const getData = () => {
    getOrders("/orders")
      .then((data) => sortId(data))
      .then((newData) => setOrders(newData));
  };

  const sortId = (data) => {
    return data.sort((a, b) => {
      return b.id - a.id;
    });
  };

  const ordersFiltered = () => {
    return orders.filter(
      (item) => item.status === "pending" || item.status === "preparando"
    );
  };

  //Mudança do status do pedido
  const handleStatus = (elem) => {
    if (getRole() === "chef") {
      if (elem.status === "pending") {
        updateOrderStatus("/orders/", elem.id, "preparando").then(() =>
          setOrderStatus([
            ...orderStatus,
            {
              id: elem.id,
              status: "preparando",
            },
          ])
        );
      } else if (elem.status === "preparando") {
        updateOrderStatus("/orders/", elem.id, "finalizado").then(() =>
          setOrderStatus([
            ...orderStatus,
            {
              id: elem.id,
              status: "finalizado",
            },
          ])
        );
      }
    } else {
      setError('Apenas o(a) chef pode atualizar um pedido');
    }
  };

  return {
    orders,
    setOrders,
    orderStatus,
    getData,
    ordersFiltered,
    handleStatus,
    error,
  };
};
export default useKitchen;
