import { NextRequest } from 'next/server';
import { Plan } from '../../utils/Types/Plan';
import { 
  getAllEntities, 
  createEntity, 
  updateEntity, 
  deleteEntity 
} from '../../utils/crudUtils';

// Table name constant
const TABLE_NAME = 'plans';

// Validation function for plans
function validatePlanData(data: Partial<Omit<Plan, 'id'>>) {
  if (!data.name) {
    return { isValid: false, message: 'Name is required' };
  }
  
  if (data.price !== undefined && typeof data.price !== 'number') {
    return { isValid: false, message: 'Price is required' };
  }
  
  if (data.maxChatbots !== undefined && typeof data.maxChatbots !== 'number') {
    return { isValid: false, message: 'maxChatbots must be a number' };
  }
  
  if (data.maxMessages !== undefined && typeof data.maxMessages !== 'number') {
    return { isValid: false, message: 'maxMessages must be a number' };
  }
  
  return { isValid: true };
}

export async function GET() {
  return getAllEntities<Plan>(TABLE_NAME);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  return createEntity<Plan>(
    TABLE_NAME,
    data,
    ['name', 'price', 'maxChatbots', 'maxMessages'],
    validatePlanData
  );
}

export async function PUT(req: NextRequest) {
  const { id, ...updateData } = await req.json();
  return updateEntity<Plan>(
    TABLE_NAME,
    id,
    updateData,
    validatePlanData
  );
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  return deleteEntity<Plan>(TABLE_NAME, id);
}
