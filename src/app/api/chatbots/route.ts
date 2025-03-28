import { NextResponse } from 'next/server';
import { ChatbotDAO } from '../../utils/DAO/ChatbotsDAO';
import { Chatbot } from '../../utils/Types/chatbot';
import { z } from 'zod';

// Esquema de validación para la creación de chatbots (sin id)
// Ajusta tipos y validaciones según necesidad (ej. configuration puede ser más específico)
// Esquema de validación para la creación de chatbots (sin id)
// *** AJUSTADO para asegurar compatibilidad con Omit<Chatbot, 'id'> ***
const chatbotCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // Si 'description' es REQUERIDO en la interfaz Chatbot, pero opcional en la API:
  // Proporciona un valor por defecto. Asegúrate de que '' sea aceptable si no se provee.
  description: z.string().optional().default(''), // O .default(null) si tu interfaz/DB lo permite
  // Si 'configuration' es REQUERIDO en la interfaz Chatbot:
  // Proporciona un objeto vacío por defecto.
  configuration: z.record(z.any()).optional().default({}), // Asegura que siempre sea un objeto
  role: z.string().min(1, "Role is required"),
  systemInstruction: z.string().min(1, "System instruction is required"),
  organizationId: z.number().int().positive("Organization ID must be a positive integer"),
});


// GET /api/chatbots - Obtener todos los chatbots
export async function GET(request: Request) {
  try {
    const chatbotDao = new ChatbotDAO();
    // Asume que findAll ya mapea a camelCase gracias a BaseDAO
    const chatbots = await chatbotDao.findAll();
    return NextResponse.json(chatbots);
  } catch (error) {
    console.error("Failed to fetch chatbots:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/chatbots - Crear un nuevo chatbot
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validar el cuerpo de la solicitud
    const validation = chatbotCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: "Invalid input", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const validatedData = validation.data;
    const chatbotDao = new ChatbotDAO();

    // Opcional: Verificar si ya existe un chatbot con el mismo nombre para la organización
    // Esto requeriría un método DAO como findByNameAndOrganization(name, orgId) o filtrar aquí
    // const existing = await chatbotDao.findByName(validatedData.name); // Simple check by name
    // if (existing && existing.organizationId === validatedData.organizationId) {
    //    return NextResponse.json({ message: `Chatbot with name '${validatedData.name}' already exists for this organization` }, { status: 409 });
    // }

    // Crear el chatbot (asegurándose de que el tipo coincida con Omit<Chatbot, 'id'>)
    // El tipo `validatedData` ya debería coincidir si el schema está bien definido
    const newChatbot = await chatbotDao.create(validatedData as Omit<Chatbot, 'id'>);

    return NextResponse.json(newChatbot, { status: 201 }); // 201 Created

  } catch (error) {
    console.error("Failed to create chatbot:", error);
     if (error instanceof z.ZodError) {
        return NextResponse.json({ message: "Invalid input", errors: error.flatten().fieldErrors }, { status: 400 });
    }
    // Podrías manejar errores específicos de la DB aquí si es necesario (ej. violación de constraint UNIQUE)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}