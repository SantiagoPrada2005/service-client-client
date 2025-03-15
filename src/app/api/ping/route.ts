// documentación https://nextjs.org/docs/pages/building-your-application/routing/api-routes
import { NextResponse, NextRequest } from "next/server";
import { query } from "../../utils/db";


// GET - Obtener recursos
export async function GET() {
    try {
        const response = await query<[]>(`SELECT NOW()`);
        
        return NextResponse.json(
            { 
                success: true, 
                data: response,
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