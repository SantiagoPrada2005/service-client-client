'use client';
import styles from './css/main.module.css';

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.sidebarContainer}>
          <ul className={styles.sidebarList}>
            <div className={styles.sidebarTop}>
              <li className={styles.sidebarItem}>Inicio</li>
              <li className={styles.sidebarItem}>Cerrar Sesión</li>
            </div>
            <div className={styles.sidebarBottom}>
              <li className={styles.sidebarItem}>Perfil</li>
              <li className={styles.sidebarItem}>Configuración</li>
            </div>
          </ul>
        </div>
      </div>
      <div className={styles.mainContent}>
      <button type="submit" className={styles.button}>Continuar</button>
      </div>
    </div>
  );
}