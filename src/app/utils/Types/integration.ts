export interface Integration {
    id: number;
    chatbotId: number;
    service: Service;
    apiKey: string;
    webhookUrl: string;
    config: object;
    status: Status;
    createdAt: Date | string;
}

export enum Service {
    Whatsapp = "Whatsapp",
    Telegram = "Telegram"
}

export enum Status {
    Active = "active",
    Inactive = "inactive"
}