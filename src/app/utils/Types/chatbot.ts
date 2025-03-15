export interface Chatbot {
    id: number;
    name: string;
    description: string;
    configuration: object;
    role: string;
    systemInstruction: string;
    organizationId: number
}