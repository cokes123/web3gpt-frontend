import React from 'react';
import styles from './index.module.css';

const TradeForm: React.FC = () => {
  return (
    <div className={styles.tradeForm}>
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.active}`}>Spot</button>
        <button className={styles.tab}>Contract</button>
      </div>
      
      <div className={styles.limitSelection}>
        <label htmlFor="limit">Limit</label>
        <select id="limit" className={styles.select}>
          <option>Market</option>
          <option>Stop Limit</option>
        </select>
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="price">Price</label>
        <input 
          type="text" 
          id="price" 
          placeholder="88981.99 USDT" 
          className={styles.input}
        />
      </div>
      
      <div className={styles.inputGroup}>
        <label htmlFor="amount">Amount</label>
        <input 
          type="text" 
          id="amount" 
          placeholder="BTC" 
          className={styles.input}
        />
      </div>
      
      <div className={styles.slider}>
        <input type="range" min="0" max="100" className={styles.range} />
      </div>
      
      <div className={styles.checkboxGroup}>
        <input type="checkbox" id="tp-sl" className={styles.checkbox} />
        <label htmlFor="tp-sl">TP/SL</label>
      </div>
      
      <div className={styles.infoRow}>
        <span>Avbl</span> 
        <span>-- USDT</span>
      </div>
      
      <div className={styles.infoRow}>
        <span>Max Buy</span> 
        <span>-- BTC</span>
      </div>
      
      <button className={styles.buyButton}>BUY</button>
    </div>
  );
};

export default TradeForm;
