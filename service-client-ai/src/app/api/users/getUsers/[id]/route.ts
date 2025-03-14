import { NextResponse, NextRequest } from 'next/server';
import { query, } from '../../../../utils/db';
import { User } from '../../../../utils/Types/User';


/**
 * @desc    Obtiene un usuario específico por su ID
 * @route   GET /api/users/[id]
 * @access  Público
 * @param   {NextRequest} request - Objeto de petición de Next.js
 * @param   {Object} params - Parámetros de la ruta
 * @param   {string} params.id - ID del usuario a buscar
 * @returns {NextResponse} Respuesta JSON con usuario o error
 * @throws  {500} Error del servidor si falla la consulta
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const {id} = await params;
        // Ejemplo de mejora: Validación de parámetros
        if (!Number.isInteger(Number(id))) {
            return NextResponse.json(
              { success: false, message: 'ID inválido' },
              { status: 400 }
            );
          }
        const usuarios = await query<[User]>(`SELECT * FROM users WHERE id = ?`, [id]);
        
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