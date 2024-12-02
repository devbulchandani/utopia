import React from 'react';
import { UserGroupIcon } from '@heroicons/react/solid';

interface EventCapacityProps {
    attendeeCount: number;
    capacity: number;
}

export const EventCapacity: React.FC<EventCapacityProps> = ({ attendeeCount, capacity }) => {
    const capacityPercentage = capacity > 0 ? (attendeeCount / capacity) * 100 : 0;

    return (
        <div className="mt-4">
            <div className="flex items-center text-zinc-400">
                <UserGroupIcon className="w-5 h-5 mr-2" />
                <span>
                    {attendeeCount} / {capacity} attendees
                </span>
            </div>
            <div className="mt-2 w-full bg-zinc-700 rounded-full h-2">
                <div
                    className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                    style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                />
            </div>
        </div>
    );
};
