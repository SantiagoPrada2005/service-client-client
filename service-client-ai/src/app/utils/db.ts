import mysql from 'mysql2/promise';

// Configuración de la conexión
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'serviceClientAIDB',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para ejecutar consultas
export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [results] = await pool.execute(sql, params);
    return results as T;
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    throw error;
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    return false;
  }
}

// Crear tabla de usuarios si no existe
export async function initDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await query(createTableSQL, []);
    console.log('Tabla de usuarios creada o verificada');
  } catch (error) {
    console.error('Error al crear la tabla de usuarios:', error);
    throw error;
  }
}

// Función para obtener una conexión individual
export async function getConnection() {
  try {
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

// Función para cerrar el pool (útil al cerrar la aplicación)
export async function closeDatabase(): Promise<void> {
  try {
    await pool.end();
    console.log('Conexión a la base de datos cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar la base de datos:', error);
    throw error;
  }
}

exports = {
  query,
  testConnection,
  initDatabase,
  getConnection,
  transaction,
  closeDatabase
};