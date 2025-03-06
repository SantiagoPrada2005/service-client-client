'use client';
import { useState } from 'react';
import styles from './css/login.module.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí irá tu lógica de autenticación
      console.log('Datos del formulario:', formData);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
          <div className={styles.imageContainer}>
          </div>
          <div className={styles.loginElements}>
          <div className={styles.formWrapper}>
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Usuario</label>
              <input
                type="user"
                id="username"
                name="username"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Iniciar Sesión
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
