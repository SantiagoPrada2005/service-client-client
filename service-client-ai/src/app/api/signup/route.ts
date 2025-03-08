import { NextResponse } from 'next/server';
import db from './lib/db';

export async function POST(request: Request) {
  const { username, email, password } = await request.json();

  try {
    const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    console.log(result);
    const userId = result[0].insertId; // Access insertId correctly
    return NextResponse.json({ message: 'Usuario registrado exitosamente', userId }, { status: 201 });
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    return NextResponse.json({ message: 'Error al registrar usuario', error: error.message }, { status: 500 });
  }
}
