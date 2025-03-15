export interface AIInferenceChatMetrics {
    id: number;
    chatId: number;
    metricType: MetricType;
    value: number;
    confidence: number;
    recordedAt: Date | string;
    chatbotId: number;
}

export enum MetricType {
    UserSatisfaction = 'user_satisfaction',
    UserDissatisfaction = 'user_dissatisfaction',
    SentimentScore = 'sentiment_score'
}