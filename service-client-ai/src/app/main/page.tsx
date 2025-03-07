'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './css/main.module.css';

// Definición de la interfaz para los datos del formulario
interface FormData {
  username: string;
  email: string;
  password: string;
  confirmarPassword: string;
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmarPassword: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        <div className={styles.sidebarContainer}>
        </div>
        <div className={styles.loginElements}>
          <div className={styles.formWrapper}>
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Usuario"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electronico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electronico"
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
                  placeholder="Contraseña"
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
                  placeholder="Confirmar Contraseña"
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
    </div>
  );
}