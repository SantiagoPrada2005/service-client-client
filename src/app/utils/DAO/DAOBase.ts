import { query } from '../db';
import { ResultSetHeader } from 'mysql2/promise';

export abstract class BaseDAO<T> {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    // Utilidad para convertir camelCase a snake_case
    protected toSnakeCase(str: string): string {
        return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    }

    // Utilidad para convertir snake_case a camelCase
    protected toCamelCase(str: string): string {
        return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    }

    // Método auxiliar para mapear resultados
    protected mapRowToCamelCase(row: any): T {
        const camelCaseRow: any = {};
        for (const [key, value] of Object.entries(row)) {
            camelCaseRow[this.toCamelCase(key)] = value;
        }
        return camelCaseRow as T;
    }

    // Convierte un objeto de camelCase a snake_case
    protected toSnakeCaseObject(obj: any): any {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
            result[this.toSnakeCase(key)] = value;
        }
        return result;
    }

    async findAll(): Promise<T[]> {
        const results = await query<any[]>(`SELECT * FROM ${this.tableName}`);
        return results.map(row => {
            const camelCaseRow: any = {};
            for (const [key, value] of Object.entries(row)) {
                camelCaseRow[this.toCamelCase(key)] = value;
            }
            return camelCaseRow as T;
        });
    }

    async findById(id: number): Promise<T | null> {
        const [result] = await query<any[]>(
            `SELECT * FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
        if (!result) return null;

        const camelCaseResult: any = {};
        for (const [key, value] of Object.entries(result)) {
            camelCaseResult[this.toCamelCase(key)] = value;
        }
        return camelCaseResult as T;
    }

    async create(data: Omit<T, 'id'>): Promise<T> {
        const snakeCaseData = this.toSnakeCaseObject(data);
        const fields = Object.keys(snakeCaseData);
        const values = Object.values(snakeCaseData);
        const placeholders = fields.map(() => '?').join(', ');

        const result = await query<ResultSetHeader>(
            `INSERT INTO ${this.tableName} (${fields.join(', ')}) VALUES (${placeholders})`,
            values
        );

        return this.findById(result.insertId) as Promise<T>;
    }

    async update(id: number, data: Partial<T>): Promise<T | null> {
        const snakeCaseData = this.toSnakeCaseObject(data);
        const entries = Object.entries(snakeCaseData);
        const setClauses = entries.map(([key]) => `${key} = ?`).join(', ');
        const values = entries.map(([_, value]) => value);

        await query<ResultSetHeader>(
            `UPDATE ${this.tableName} SET ${setClauses} WHERE id = ?`,
            [...values, id]
        );

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await query<ResultSetHeader>(
            `DELETE FROM ${this.tableName} WHERE id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }
}