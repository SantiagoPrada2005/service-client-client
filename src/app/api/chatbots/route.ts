import { NextResponse, NextRequest } from "next/server";
import { ChatbotDAO } from "../../utils/DAO/ChatbotsDAO";

export async function GET(req: NextRequest) {
    try {
        const chatbotDAO = new ChatbotDAO();
        const chatbots = await chatbotDAO.findAll();
        
        return NextResponse.json(
            { 
                success: true, 
                data: chatbots,
                message: 'Chatbots retrieved successfully' 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to retrieve chatbots',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const chatbotDAO = new ChatbotDAO();
        const body = await req.json();
        const chatbot = await chatbotDAO.create(body);
        
        return NextResponse.json(
            { 
                success: true, 
                data: chatbot,
                message: 'Chatbot created successfully' 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: 'Failed to create chatbot',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}