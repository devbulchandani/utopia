export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
    registeredAt: string;
    category: 'tech' | 'design' | 'business' | 'other';
} 