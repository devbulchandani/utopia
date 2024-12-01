import React from 'react';
import { PencilIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Event } from '../../types/event';
import { EventStatus } from './EventStatus';
import { EventCapacity } from './EventCapacity';
import { formatDate } from '../../utils/date';
import { Button } from '../ui/Button';

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
    onCancel: (eventId: string) => void;
    onViewAttendees: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
    event,
    onEdit,
    onCancel,
    onViewAttendees,
}) => {
    return (
        <div className="bg-zinc-800 rounded-lg shadow-xl p-6 hover:shadow-zinc-700/20 transition-shadow border border-zinc-700">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-semibold text-zinc-100">{event.title}</h3>
                    <p className="text-zinc-400 mt-1">{formatDate(event.date)}</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(event)}
                        className="p-2 text-zinc-400 hover:text-blue-400 rounded-full hover:bg-zinc-700"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onCancel(event.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 rounded-full hover:bg-zinc-700"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <EventCapacity
                attendeeCount={event.tickets.total - event.tickets.available}
                capacity={event.tickets.total}
            />

            <div className="mt-4 space-y-4">
                <EventStatus status={event.status} />

                <Button
                    variant="secondary"
                    onClick={() => onViewAttendees(event)}
                    className="w-full flex items-center justify-center space-x-2"
                >
                    <UserGroupIcon className="w-5 h-5" />
                    <span>View Attendees</span>
                </Button>
            </div>
        </div>
    );
};