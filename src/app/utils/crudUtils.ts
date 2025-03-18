/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { query } from './db';
import type { ResultSetHeader } from 'mysql2/promise';

interface BaseEntity {
  id: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

/**
 * Generic function to get all entities of a specific type
 * @param tableName The database table name
 * @param customQuery Optional custom query to replace the default SELECT * query
 * @param params Optional parameters for the custom query
 */
export async function getAllEntities<T>(
  tableName: string,
  customQuery?: string,
  params: any[] = []
) {
  try {
    const queryString = customQuery || `SELECT * FROM ${tableName}`;
    const entities = await query<T[]>(queryString, params);
    
    return NextResponse.json<ApiResponse<T[]>>(
      { 
        success: true, 
        data: entities,
        message: `${tableName} retrieved successfully` 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Database query error for ${tableName}:`, error);
    return NextResponse.json<ApiResponse<T[]>>(
      { 
        success: false, 
        message: `Failed to retrieve ${tableName}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Generic function to create a new entity
 * @param tableName The database table name
 * @param data The entity data to insert
 * @param requiredFields Array of field names that are required
 * @param validateFn Optional function to perform additional validation
 */
export async function createEntity<T extends BaseEntity>(
  tableName: string,
  data: Omit<T, 'id'>,
  requiredFields: string[] = [],
  validateFn?: (data: any) => { isValid: boolean; message?: string }
) {
  try {
    // Check required fields
    for (const field of requiredFields) {
      if (data[field as keyof typeof data] === undefined) {
        return NextResponse.json<ApiResponse<T>>(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Run custom validation if provided
    if (validateFn) {
      const validation = validateFn(data);
      if (!validation.isValid) {
        return NextResponse.json<ApiResponse<T>>(
          { success: false, message: validation.message || 'Validation failed' },
          { status: 400 }
        );
      }
    }

    // Prepare fields and values for insertion
    const fields = Object.keys(data);
    const placeholders = fields.map(() => '?').join(', ');
    const values = Object.values(data);

    // Convert camelCase to snake_case for database fields
    const dbFields = fields.map(field => 
      field.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    );

    // Insert the entity
    const insertResult = await query<ResultSetHeader>(
      `INSERT INTO ${tableName} (${dbFields.join(', ')}) VALUES (${placeholders})`,
      values
    );

    // Get the newly created entity
    const [newEntity] = await query<T[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [insertResult.insertId]
    );

    return NextResponse.json<ApiResponse<T>>(
      { success: true, data: newEntity, message: `${tableName} created successfully` },
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error creating ${tableName}:`, error);
    return NextResponse.json<ApiResponse<T>>(
      { 
        success: false,
        message: `Error creating ${tableName}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Generic function to update an existing entity
 * @param tableName The database table name
 * @param id The entity ID to update
 * @param updateData The data to update
 * @param validateFn Optional function to perform additional validation
 */
export async function updateEntity<T extends BaseEntity>(
  tableName: string,
  id: number,
  updateData: Partial<Omit<T, 'id'>>,
  validateFn?: (data: any) => { isValid: boolean; message?: string }
) {
  try {
    if (!id) {
      return NextResponse.json<ApiResponse<T>>(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }

    // Run custom validation if provided
    if (validateFn) {
      const validation = validateFn(updateData);
      if (!validation.isValid) {
        return NextResponse.json<ApiResponse<T>>(
          { success: false, message: validation.message || 'Validation failed' },
          { status: 400 }
        );
      }
    }

    // Convert camelCase keys to snake_case for database
    const dbUpdateData: Record<string, any> = {};
    Object.entries(updateData).forEach(([key, value]) => {
      const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      dbUpdateData[dbKey] = value;
    });

    // Build SET clause dynamically
    const setClauses = Object.keys(dbUpdateData).map(key => `${key} = ?`);
    const values = Object.values(dbUpdateData);

    const queryString = `UPDATE ${tableName} SET ${setClauses.join(', ')} WHERE id = ?`;
    const updateResult = await query<ResultSetHeader>(queryString, [...values, id]);

    // Check if any record was updated
    if (updateResult.affectedRows === 0) {
      return NextResponse.json<ApiResponse<T>>(
        { success: false, message: `${tableName} not found` },
        { status: 404 }
      );
    }

    // Get the updated entity
    const [updatedEntity] = await query<T[]>(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      [id]
    );

    return NextResponse.json<ApiResponse<T>>(
      { success: true, data: updatedEntity, message: `${tableName} updated successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error updating ${tableName}:`, error);
    return NextResponse.json<ApiResponse<T>>(
      { 
        success: false,
        message: `Error updating ${tableName}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Generic function to delete an entity
 * @param tableName The database table name
 * @param id The entity ID to delete
 */
export async function deleteEntity<T extends BaseEntity>(
  tableName: string,
  id: number
) {
  try {
    if (!id) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: 'ID is required' },
        { status: 400 }
      );
    }

    // Check if MySQL supports RETURNING clause, otherwise use a different approach
    let result;
    try {
      result = await query<ResultSetHeader>(
        `DELETE FROM ${tableName} WHERE id = ? RETURNING *`,
        [id]
      );
    } catch (e) {
      // If RETURNING is not supported, check if entity exists first
      const [entity] = await query<T[]>(
        `SELECT id FROM ${tableName} WHERE id = ?`,
        [id]
      );
      
      if (!entity) {
        return NextResponse.json<ApiResponse<null>>(
          { success: false, message: `${tableName} not found, error: ${e}` },
          { status: 404 }
        );
      }
      
      result = await query<ResultSetHeader>(
        `DELETE FROM ${tableName} WHERE id = ?`,
        [id]
      );
    }

    if (result.affectedRows === 0) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, message: `${tableName} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<null>>(
      { success: true, message: `${tableName} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting ${tableName}:`, error);
    return NextResponse.json<ApiResponse<null>>(
      { 
        success: false,
        message: `Error deleting ${tableName}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}