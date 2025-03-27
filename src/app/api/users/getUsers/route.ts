import { NextResponse } from 'next/server';
import { UserDAO } from '../../../utils/DAO/UserDAO';

export async function GET() {
    try {
        const userDAO = new UserDAO();
        const usuarios = await userDAO.findAll();
        
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