import { get } from 'http';
import mysql from 'mysql2/promise';

// Configuración de la conexión
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mi_base_de_datos',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Variable para almacenar la instancia del pool globalmente
let poolInstance: mysql.Pool | null = null;

// Función para obtener el pool (singleton)
export function getPool(): mysql.Pool {
  if (!poolInstance) {
    poolInstance = mysql.createPool(dbConfig);
    console.log('Nuevo pool de conexiones creado');
  }
  return poolInstance;
}


// Función para ejecutar consultas
export async function query<T>(
  sql: string, 
  params: any[] = []
): Promise<T> {
  try {
    const pool = getPool();
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error);
    throw error;
  }
}

// Función para obtener una conexión individual
export async function getConnection() {
  try {
    const pool = getPool();
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error al obtener conexión:', error);
    throw error;
  }
}

// Función para transacciones
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const pool = getPool();
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error('Error en la transacción:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Función de inicialización (opcional)
export async function initDatabase(): Promise<void> {
  try {
    // Comprueba la conexión
    const pool = getPool();
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
    
    // Aquí podrías ejecutar migraciones o inicializaciones
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
}

// Función para cerrar el pool (útil al cerrar la aplicación)
export async function closeDatabase(): Promise<void> {
  try {
    const pool = getPool();
    await pool.end();
    console.log('Conexión a la base de datos cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar la base de datos:', error);
    throw error;
  }
}

exports = {
    getPool,
    query,
    getConnection,
    transaction,
    initDatabase,
    closeDatabase
};