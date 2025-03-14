import { NextResponse, NextRequest } from 'next/server';
import { query } from '../../utils/db';
import {Plan} from '../../utils/Types/Plan';
import type { ResultSetHeader } from 'mysql2/promise'; // Importar tipo MySQL

export async function GET() {
    try {
        const planes = await query<Plan[]>(`SELECT * FROM plans`);
        
        return NextResponse.json(
            { 
                success: true, 
                data: planes,
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

export async function POST(req: NextRequest) {
  try {
    const { name, price, maxChatbots, maxMessages } = await req.json();
    
    if (!name || !price) {
      return NextResponse.json(
        { success: false, message: 'Name and price are required' },
        { status: 400 }
      );
    }
    if (typeof maxChatbots !== 'number' || typeof maxMessages !== 'number') {
      return NextResponse.json(
        { success: false, message: "maxChatbots and maxMessages must be numbers" },
        { status: 400 }
      );
    }

    // Insertar usando placeholders de MySQL (?)
    const insertResult = await query<ResultSetHeader>(
        `INSERT INTO plans (name, price, max_chatbots, max_messages) VALUES (?, ?, ?, ?)`,
        [name, price, maxChatbots, maxMessages]
      );

    // Obtener el plan recién creado
    const [newPlan] = await query<Plan[]>(
        `SELECT * FROM plans WHERE id = ?`,
        [insertResult.insertId]
      );

    return NextResponse.json(
      { success: true, data: newPlan, message: 'Plan created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating plan:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Error creating plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT: Actualizar plan existente
export async function PUT(req: NextRequest) {
    try {
      const { id, ...updateData } = await req.json();
      
      if (!id) {
        return NextResponse.json(
          { success: false, message: 'Plan ID is required' },
          { status: 400 }
        );
      }
  
      // Construir SET clause dinámico
      const setClauses = Object.keys(updateData).map(key => `${key} = ?`);
      const values = Object.values(updateData);
  
      const queryString = `UPDATE plans SET ${setClauses.join(', ')} WHERE id = ?`;
      const updateResult = await query<ResultSetHeader>(queryString, [...values, id]);
  
      // Verificar si se actualizó algún registro
      if (updateResult.affectedRows === 0) {
        return NextResponse.json(
          { success: false, message: 'Plan not found' },
          { status: 404 }
        );
      }
  
      // Obtener el plan actualizado
      const [updatedPlan] = await query<Plan[]>(
        `SELECT * FROM plans WHERE id = ?`,
        [id]
      );
  
      return NextResponse.json(
        { success: true, data: updatedPlan, message: 'Plan updated successfully' },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error updating plan:', error);
      return NextResponse.json(
        { 
          success: false,
          message: 'Error updating plan',
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  }

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Plan ID is required' },
        { status: 400 }
      );
    }

    const result = await query<ResultSetHeader>(
      'DELETE FROM plans WHERE id = ? RETURNING *',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'Plan not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Plan deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting plan:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Error deleting plan',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}