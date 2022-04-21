export interface NightbotTimer {
    _id: string;
    interval: string;
    createdAt: string;
    enabled: boolean;
    lines: number;
    message: string;
    name: string;
    nextRunAt: string;
}