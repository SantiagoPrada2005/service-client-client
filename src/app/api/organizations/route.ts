import { NextRequest } from "next/server";
import { Organization } from "../../utils/Types/organization";
import {
    getAllEntities, 
    createEntity, 
    updateEntity, 
    deleteEntity
} from "../../utils/crudUtils"

const TABLE_NAME = 'organizations'

function validateOrganizationData(data: Partial<Omit<Organization, 'id'>>) {
    if (!data.name) {
      return { isValid: false, message: 'Name is required' };
    }
    
    if (data.planId !== undefined && typeof data.planId !== 'number') {
      return { isValid: false, message: 'Plan is required' };
    }
   
    
    return { isValid: true };
  }

export async function GET() {
    return getAllEntities<Organization>(TABLE_NAME);
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    return createEntity<Organization>(
        TABLE_NAME,
        data,
        ['name', 'planId'],
        validateOrganizationData
    );
}

export async function PUT(req: NextRequest) {
    const { id, ...updateData } = await req.json();
    return updateEntity<Organization>(
        TABLE_NAME,
        id,
        updateData,
        validateOrganizationData
    );
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();
    return deleteEntity<Organization>(TABLE_NAME, id);
}