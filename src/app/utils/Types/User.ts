export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    organizationId: number;
    createdAt: Date | string;
    updatedAt: Date | string;
}
