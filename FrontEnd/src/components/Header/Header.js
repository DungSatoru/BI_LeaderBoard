import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles['main-top']}>
      <h1>Tổng quan</h1>
      <i className="fas fa-user-cog"></i>
    </div>
  );
}

export default Header;
