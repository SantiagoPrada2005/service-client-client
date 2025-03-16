import { NextRequest } from 'next/server';
import { generateResponse } from '../../../utils/AI/Gemini/controller';

export async function POST(request: NextRequest) {
  return generateResponse(request);
}