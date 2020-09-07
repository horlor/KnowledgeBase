export interface MyNotification{
    id: number,
    title: string,
    content: string,
    questionId: number,
    seen: boolean,
    important: boolean,
}

export interface PendingNotificationDto{
    count: number,
    notifications: MyNotification[],
}