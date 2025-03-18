export interface ChatMetric {
    id: number;
    chatId: number;
    metricType: MetricType;
    value: number;
    recordedAt: Date | string;
}

export enum MetricType {
    MessagesExchanged = "messages_exchanged",
    UserEngagement = "user_engagement",
    Duration = "duration"
}