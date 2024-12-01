import React from 'react';
import { Calendar } from 'lucide-react';

interface EventsHeaderProps {
    activeTab: 'upcoming' | 'past';
    onTabChange: (tab: 'upcoming' | 'past') => void;
}

const EventsHeader: React.FC<EventsHeaderProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-zinc-400" />
                <h1 className="text-3xl font-bold text-zinc-100">Events</h1>
            </div>

            <div className="flex bg-zinc-800/50 rounded-lg p-1">
                <button
                    onClick={() => onTabChange('upcoming')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'upcoming'
                            ? 'bg-zinc-700 text-zinc-100'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => onTabChange('past')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'past'
                            ? 'bg-zinc-700 text-zinc-100'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                >
                    Past
                </button>
            </div>
        </div>
    );
};

export default EventsHeader;