import { getProducts } from "../../services/api";


const useProducts = () => {

    const handleButtonTypeClick = (e) => {
     getProducts('/products')
      .then(res => res.json());
      console.log('products');
    };

    return {handleButtonTypeClick};

};
export default useProducts;