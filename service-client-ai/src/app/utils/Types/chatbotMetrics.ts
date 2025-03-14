export interface ChatbotMetrics {
    id: number;
    chatbotId: number;
    metricType: MetricType;
    value: number;
    recordedAt: Date | string;
}

export enum MetricType {
    MessagesExchanged = 'messages_exchanged',
    UserEngagement = 'user_engagement',
    Duration = 'duration'
}