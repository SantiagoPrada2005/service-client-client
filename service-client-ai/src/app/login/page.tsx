'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './css/login.module.css';
import Link from 'next/link';

// Definición de interfaces para los datos del formulario
interface FormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Aquí irá tu lógica de autenticación
      console.log('Datos del formulario:', formData);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
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
              <p>¿No tienes cuenta? </p> <Link href='/signup'>Registrarse</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}