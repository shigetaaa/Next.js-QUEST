import React from 'react';
import Link from 'next/link';
import styles from './home.module.css';


export default function GlobalNav() {
  return (
    <nav className={styles['navbar']}>
      <div className={styles['container']}>
        <a className={styles['nav-logo']} href="/">conduit</a>
        <ul className={styles['nav-right']}>
          <li className={styles['nav-item']}>
            <a className={styles['nav-link']} href="/">
              Home
            </a>
          </li>
          <li className={styles['nav-item']}>
            <a className={styles['nav-link']} href="/post">
              Post create
            </a>
          </li>
        </ul>

      </div>
    </nav>
  );
}
