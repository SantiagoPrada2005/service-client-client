import { NextResponse, NextRequest } from 'next/server';
import { query } from '../../../utils/db';
import {Plan} from '../../../utils/Types/Plan';

interface RouteContext {
    params: {
      id: string;
    };
}

/**
 * @desc    Obtiene un plan específico por su ID
 * @route   GET /api/plans/[id]
 * @access  Público
 * @param   {NextRequest} request - Objeto de petición de Next.js
 * @param   {Object} params - Parámetros de la ruta
 * @param   {string} params.id - ID del plan a buscar
 * @returns {NextResponse} Respuesta JSON con plan o error
 * @throws  {500} Error del servidor si falla la consulta
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
) {
    try {
        const {id} = context.params;
        // Ejemplo de mejora: Validación de parámetros
        if (!/^\d+$/.test(id)) {
            return NextResponse.json(
              { success: false, message: 'ID inválido' },
              { status: 400 }
            );
          }
        const plans = await query<[Plan]>(`SELECT * FROM plans WHERE id = ?`, [id]);
        
        return NextResponse.json(
            { 
                success: true, 
                data: plans,
                message: 'Plans retrieved successfully' 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to retrieve plans',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}