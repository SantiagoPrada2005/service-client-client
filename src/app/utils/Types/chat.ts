export interface Chat {
    id: number;
    integrationId: number;
    chatbotId: number;
    status: Status;
    lastMessage: string;
    lastMessageAt: Date | string;
    createdAt: Date | string;
}

export enum Status {
    Active = "Active",
    Archive = "Archive",
    Closed = "Closed"
}