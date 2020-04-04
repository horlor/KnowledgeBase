export interface MyNotification{
    id: number,
    title: string,
    content: string,
    questionId: number,
    finished: boolean,
}

export interface PendingNotificationDto{
    count: number,
    notifications: MyNotification[],
}