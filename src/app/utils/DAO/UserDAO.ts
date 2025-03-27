import { BaseDAO } from './DAOBase';
import { User } from '../Types/User';
import { query } from '../db';

export class UserDAO extends BaseDAO<User> {
    constructor() {
        super('users');
    }

    // Métodos específicos para Users
    async findByEmail(email: string): Promise<User | null> {
        const [result] = await query<any[]>( // Usar any[] para el resultado crudo
            `SELECT * FROM ${this.tableName} WHERE email = ?`,
            [email]
        );
        // Aplicar mapeo
        return result ? this.mapRowToCamelCase(result) : null;
    }

    async findByOrganization(organizationId: number): Promise<User[]> {
        const results = await query<any[]>( // Usar any[] para los resultados crudos
            `SELECT * FROM ${this.tableName} WHERE organization_id = ?`,
            [organizationId]
        );
        // Aplicar mapeo a cada resultado
        return results.map(row => this.mapRowToCamelCase(row));
    }
}