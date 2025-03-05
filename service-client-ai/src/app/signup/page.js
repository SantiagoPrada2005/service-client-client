'use client';
import { useState } from 'react';
import styles from './css/signup.module.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmarPassword) {
        console.error('Las contraseñas no coinciden');
        return;
      }
      console.log('Datos del formulario de registro:', formData);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
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
          <h1>Registro de Usuario</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
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
            <div className={styles.formGroup}>
              <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmarPassword"
                name="confirmarPassword"
                value={formData.confirmarPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
