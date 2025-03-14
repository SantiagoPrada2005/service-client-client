import { NextResponse } from 'next/server';
import { query } from '../../../utils/db';
import {User} from '../../../utils/Types/User';


/**
 * @desc    Obtiene todos los usuarios registrados
 * @route   GET /api/users
 * @access  Público
 * @returns {NextResponse} Respuesta JSON con lista de usuarios o error
 * @throws  {500} Error del servidor si falla la consulta
 */
export async function GET() {
    try {
        const usuarios = await query<User[]>(`SELECT * FROM users`);
        
        return NextResponse.json(
            { 
                success: true, 
                data: usuarios,
                message: 'Users retrieved successfully' 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to retrieve users',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}