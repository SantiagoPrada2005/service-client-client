export interface Message {
    id: number;
    chatId: number;
    sender: Sender;
    message: string;
    status: Status;
    createdAt: Date | string;
}

export enum Sender {
    User = "user",
    Chatbot = "chatbot"
}  

export enum Status {
    Sent = "sent",
    Read = "read",
    Delivered = "delivered",
    Failed = "failed"
}
