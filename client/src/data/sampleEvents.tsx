import { Event } from "../types/event"; 

// Helper function to create dates relative to now
const getRelativeDate = (days: number, hours = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    return date.toISOString();
};

export const sampleEvents: Event[] = [
    {
        id: '1',
        title: 'React Advanced Workshop',
        description: 'Deep dive into React hooks, patterns, and performance optimization',
        date: getRelativeDate(0, 1), // Starting in 1 hour
        location: 'Tech Hub, Downtown',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-2),
        category: 'tech'
    },
    {
        id: '2',
        title: 'UX Design Sprint',
        description: 'Intensive 2-day workshop on user experience design',
        date: getRelativeDate(1), // Tomorrow
        location: 'Design Studio',
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-1),
        category: 'design'
    },
    {
        id: '3',
        title: 'Startup Networking Event',
        description: 'Connect with fellow entrepreneurs and investors',
        date: getRelativeDate(2), // In 2 days
        location: 'Innovation Hub',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-3),
        category: 'business'
    },
    {
        id: '4',
        title: 'AI & Machine Learning Conference',
        description: 'Latest developments in AI and ML technologies',
        date: getRelativeDate(5), // In 5 days
        location: 'Tech Conference Center',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-4),
        category: 'tech'
    },
    {
        id: '5',
        title: 'Web Performance Summit',
        description: 'Optimizing web applications for speed and efficiency',
        date: getRelativeDate(-1), // Yesterday
        location: 'Virtual Event',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-10),
        category: 'tech'
    },
    {
        id: '6',
        title: 'Design Systems Workshop',
        description: 'Building and maintaining scalable design systems',
        date: getRelativeDate(-2), // 2 days ago
        location: 'Creative Space',
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80',
        registeredAt: getRelativeDate(-15),
        category: 'design'
    }
];