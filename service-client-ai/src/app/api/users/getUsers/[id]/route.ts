import { NextResponse, NextRequest } from 'next/server';
import { query, } from '../../../../utils/db';
import { User } from '../../../../utils/Types/User';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const {id} = await params;
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