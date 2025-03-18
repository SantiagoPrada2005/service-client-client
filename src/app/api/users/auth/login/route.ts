// app/api/auth/login/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { query } from '../../../../utils/db';
import { User } from '../../../../utils/Types/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * POST /api/auth/login
 * 
 * Autentica un usuario y devuelve un token JWT
 * 
 * @body {object} credentials - Datos de autenticación
 * @body {string} credentials.username - Nombre de usuario
 * @body {string} credentials.password - Contraseña
 * 
 * @returns {object} - Objeto con token JWT y datos básicos del usuario
 * @returns {number} 200 - Autenticación exitosa
 * @returns {number} 400 - Datos inválidos o faltantes
 * @returns {number} 401 - Credenciales inválidas
 * @returns {number} 500 - Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validar que se proporcionaron las credenciales
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar el usuario en la base de datos
    const users = await query<User[]>(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    // Verificar si el usuario existe
    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key', // Usa una variable de entorno en producción
      { 
        expiresIn: '24h' 
      }
    );

    // Devolver respuesta exitosa con token y datos de usuario (sin contraseña)
    const { ...userWithoutPassword } = user;
    
    return NextResponse.json(
      {
        success: true,
        message: 'Autenticación exitosa',
        token,
        user: userWithoutPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en autenticación:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error al procesar la solicitud',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}