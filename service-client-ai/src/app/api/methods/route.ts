import { NextRequest, NextResponse } from "next/server";


// En /api/users/route.ts - SOLO para operaciones de colección
export async function GET(request: NextRequest) {
  // Lógica para obtener TODOS los usuarios
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  const usuarios = [{ id: 1, nombre: "Ana" }, { id: 2, nombre: "Luis" }];
  
  return NextResponse.json(usuarios);
}

// POST - Crear nuevo recurso
export async function POST(request: NextRequest) {
  // Obtener datos del cuerpo
  const body = await request.json();
  
  console.log("Creando usuario:", body);
  
  // Simular creación y retornar respuesta
  return NextResponse.json(
    { id: 3, ...body, creado: true }, 
    { status: 201 }
  );
}

// PUT - Actualizar recurso completo
export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  console.log("Actualizando usuario:", body);
  
  return NextResponse.json({ ...body, actualizado: true });
}

// PATCH - Actualización parcial
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({ ...body, actualizadoParcialmente: true });
}

// DELETE - Eliminar recurso
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  console.log("Eliminando usuario con ID:", id);
  
  return NextResponse.json({ eliminado: true, id });
}