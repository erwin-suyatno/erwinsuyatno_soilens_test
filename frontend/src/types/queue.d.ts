export interface Queue {
    id: number,
    status: 'waiting' | 'checking' | 'repairing' | 'completed',
    noQueue: string,
    priority: 'low' | 'medium' | 'high',
    reason: string,
    machine: string, //bisa objectId karena nanti saya akan buatkan masterdata machine
    createdAt: Date,
    updatedAt: Date,
    lastUpdated: string,
}


