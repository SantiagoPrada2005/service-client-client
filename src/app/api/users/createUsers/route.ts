// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { query } from '../../../utils/db';
import bcrypt from 'bcrypt';
import type { ResultSetHeader } from 'mysql2';
import {formatDateToMySQLTimestamp} from '../../../utils/formatearFecha';

/**
 * POST /api/users
 * 
 * Crea un nuevo usuario en la base de datos
 * 
 * @body {object} userData - Datos del usuario a crear
 * @body {string} userData.username - Nombre de usuario
 * @body {string} userData.email - Correo electrónico
 * @body {string} userData.password - Contraseña (será hasheada)
 * 
 * @returns {object} - Objeto con mensaje de éxito e ID del usuario creado
 * @returns {number} 201 - Usuario creado correctamente
 * @returns {number} 400 - Datos inválidos o faltantes
 * @returns {number} 409 - Conflicto (usuario o email ya existen)
 * @returns {number} 500 - Error del servidor
 */
export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    // Validar email con expresión regular
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido' },
        { status: 400 }
      );
    }

    // Validar longitud de la contraseña
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email],
    );

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return NextResponse.json(
        { error: 'El usuario o correo electrónico ya está registrado' },
        { status: 409 }
      );
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //formateo de fecha
    const createdAt = formatDateToMySQLTimestamp(new Date());
    const updatedAt = formatDateToMySQLTimestamp(new Date());

    // Insertar nuevo usuario
    const result = await query<ResultSetHeader>(
      'INSERT INTO users (username, email, password,organization_id,created_at,updated_at) VALUES (?, ?, ?,?,?,?)',
      [username, email, hashedPassword, 1, createdAt, updatedAt]
    );

    return NextResponse.json(
      { 
        message: 'Usuario creado exitosamente',
        userId: result.insertId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}