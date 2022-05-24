import { useEffect, useState } from "react";
import { getProducts, sendOrder } from "../../services/api";
import { getRole } from "../../services/storage";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [productsType, setProductsType] = useState("breakfast");
  const [flavor, setFlavor] = useState();
  const [complement, setComplement] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderInfo, setOrderInfo] = useState({ client: "", table: "" });
  const [orderError, setOrderError] = useState("");

  const getData = async () => {
    const data = await getProducts("/products"); // Buscando produtos da API
    setProducts(data);
  };

  useEffect(() => { //useEffect: para renderiza os produtos.
    getData();
  }, []);

  const productsFiltered = () => {
    if (productsType === "breakfast") {
      return products.filter((elem) => elem.type === "breakfast");
    } else if (productsType === "hamburguer") {
      let filterHamburguer = products.filter((elem) => elem.flavor === flavor);
      if (complement !== "") {
        filterHamburguer = filterHamburguer.filter(
          (elem) => elem.complement === complement
        );
      }
      return filterHamburguer;
    } else if (productsType === "side" || productsType === "drinks") {
      return products.filter((elem) => elem.sub_type === productsType);
    }
    return [];
  };

  const handleButtonTypeClick = (e) => {
    setProductsType(e.target.value); //Pegar o produto
  };
  const handleSelectFlavor = (e) => setFlavor(e.target.value); // pegar o sabor
  const handleSelectComplement = (e) => setComplement(e.target.value); //pegar complemento

  // Add items no carinho de pedido
  const handleAddItem = (product) => {
    const productIndex = items.findIndex((item) => item.id === product.id);
    if (productIndex === -1) {
      setItems([...items, { ...product, qtd: 1 }]);
    } else {
      items[productIndex].qtd += 1;
      setItems([...items]);
    }
  };

  // Deletando items do carinho
  const handleDeleteItems = (elem) => {
    const foundItem = items.findIndex((item) => item.id === elem.id); // procurando o produto por id
    if (foundItem !== -1) { // se for diferente de -1, não faz nada.
      const qtd = items[foundItem].qtd; 
      if (qtd === 1) { // se qtd for 1
        const removed = items; 
        removed.splice(foundItem, 1); // remova ele
        setItems([...removed]);
      } else {
        const newArr = items;
        newArr[foundItem].qtd--; // se não, diminue a qtd
        setItems([...newArr]);
      }
    } else {
      setItems([
        ...items,
        {
          id: elem.id,
          qtd: elem.qtd,
          name: elem.name,
          price: elem.price,
          flavor: elem.flavor,
        },
      ]);
    }
  };

  // Soma dos produtos no carinho
  useEffect(() => {
    const sum = (previousValue, currentValue) => previousValue + currentValue;
    setTotal(() => {
      const price = items.map((elem) => elem.qtd * elem.price);
      return price.reduce(sum, 0);
    });
  }, [items]); // dependencia para procurar os items do carinho e somar


  // Pegando o nome do cliente e mesa
  const handleOrderChange = (e) => {
    return setOrderInfo(() => {
      const auxValues = { ...orderInfo };
      auxValues[e.target.name] = e.target.value;
      return auxValues;
    });
  };

//Enviar pedido para cozinha
  const handleSendToKitchen = () => {
    if (getRole() === "attendant") {
      sendOrder("/orders", orderInfo, items)
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 400) {
            setOrderError("Dados insuficientes");
          } else { //limpar carinho.
            setItems([]);
            setFlavor("");
            setComplement("");
            setOrderError("");
            setOrderInfo({ client: "", table: "" });
          }
        });
    } else {
      setOrderError("Apenas o/a atendente fazer um pedido");
    }
  };

  return {
    handleButtonTypeClick,
    productsFiltered,
    handleAddItem,
    handleSelectFlavor,
    handleDeleteItems,
    handleSelectComplement,
    handleSendToKitchen,
    handleOrderChange,
    productsType,
    items,
    total,
    orderError,
    orderInfo,
    flavor,
  };
};
export default useProducts;
