import React from 'react';
import styles from './components.module.css';

const Cart = ({ name, flavor, complement, price, qtd, type }) => {
  return (
    <li className={styles.order}>
      <div className={styles.orderContainer}>
        <p>{qtd}</p>
        <div className={styles.orderInformation}>
          <h4>{name}</h4>
          {type === 'hamburguer' ? (
            <section>
              <p value='sabor'>- {flavor}</p>
              <p name='complemento'>- {`${complement !== null ? complement : ''}`}</p>
            </section>
          ) : ''}
        </div>
      </div>
      <p>R${price},00</p>
    </li>
  );
};

export default Cart;