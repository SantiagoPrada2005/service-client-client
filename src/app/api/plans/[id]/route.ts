import { query } from '../../../utils/db';
import {Plan} from '../../../utils/Types/Plan';
import { NextResponse } from 'next/server';

/** GET /api/plans/[id]
 * @access  Público
 * @param   {Object} params - Parámetros de la ruta
 * @param   {string} params.id - ID del plan a buscar
 * @returns {NextResponse} Respuesta JSON con plan o error
 * @throws  {500} Error del servidor si falla la consulta
 */

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params // 'a', 'b', or 'c'

    try {
      const plans = await query<[Plan]>(`SELECT * FROM plans WHERE id = ?`, [id]);
      
      return NextResponse.json(
        { 
          success: true, 
          data: plans,
          message: 'Plan recuperado exitosamente' 
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error en la consulta a la base de datos:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Error al obtener el plan', 
          error: error instanceof Error ? error.message : 'Error desconocido'
        },
        { status: 500 }
      );
    }
  }
