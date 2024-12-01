import { Event } from '../types/event';

export const getStatusColor = (status: Event['status']): {
    bgColor: string;
    textColor: string;
} => {
    switch (status) {
        case 'upcoming':
            return { bgColor: 'bg-emerald-900', textColor: 'text-emerald-200' };
        case 'ongoing':
            return { bgColor: 'bg-blue-900', textColor: 'text-blue-200' };
        case 'cancelled':
            return { bgColor: 'bg-red-900', textColor: 'text-red-200' };
        default:
            return { bgColor: 'bg-zinc-700', textColor: 'text-zinc-200' };
    }
};