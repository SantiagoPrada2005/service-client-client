import { BaseDAO } from './DAOBase';
import { Chatbot } from '../Types/chatbot';
import { query } from '../db';

export class ChatbotDAO extends BaseDAO<Chatbot> {
    constructor() {
        super('chatbots');
    }

    // Métodos específicos para Chatbots
    async findByOrganization(organizationId: number): Promise<Chatbot[]> {
        return await query<Chatbot[]>(
            `SELECT * FROM ${this.tableName} WHERE organization_id = ?`,
            [organizationId]
        );
    }

    async findByName(name: string): Promise<Chatbot | null> {
        const [result] = await query<Chatbot[]>(
            `SELECT * FROM ${this.tableName} WHERE name = ?`,
            [name]
        );
        return result || null;
    }

    async findByRole(role: string): Promise<Chatbot[]> {
        return await query<Chatbot[]>(
            `SELECT * FROM ${this.tableName} WHERE role = ?`,
            [role]
        );
    }
}