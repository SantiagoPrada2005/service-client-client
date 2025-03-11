// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { query} from '../../../utils/db'; // Asumiendo que tienes tu archivo db.ts configurado
import bcrypt from 'bcrypt';
import { User } from '../../../utils/Types/Users'; // Ajusta la ruta según la ubicación de tu interfaz

/**
 * POST /api/users
 * 
 * Crea un nuevo usuario en la base de datos
 * 
 * @body {object} userData - Datos del usuario a crear
 * @body {string} userData.usuario - Nombre de usuario
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
    const body = await request.json();
    const { usuario, email, password } = body;

    // Validar datos de entrada
    if (!usuario || !email || !password) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Formato de email inválido' },
        { status: 400 }
      );
    }

    // Verificar si el usuario o email ya existen
    const existingUser = await query<User[]>(
      'SELECT * FROM usuarios WHERE usuario = ? OR email = ?',
      [usuario, email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'El usuario o email ya están registrados' },
        { status: 409 }
      );
    }

    // Hashear la contraseña
    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar nuevo usuario
    const result = await query<{ insertId: number }>(
      'INSERT INTO `serviceClientAIDB`.`usuarios` (`usuario`, `email`, `password`) VALUES (?, ?, ?)',
      [usuario, email, hashedPassword]
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