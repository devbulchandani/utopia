import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '../types/event'; 

interface EventCardProps {
    event: Event;
    onEdit: (event: Event) => void;
    onCancel: (eventId: string) => void;
    onViewAttendees: (event: Event) => void;
}

const EventCard = ({ event, onEdit, onCancel, onViewAttendees }:EventCardProps) => {
    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date | string) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 overflow-hidden">
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>

                <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{formatTime(event.date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <button
                        className="text-sm text-blue-500 hover:underline"
                        onClick={() => onViewAttendees(event)}
                    >
                        View Attendees
                    </button>
                    <div className="space-x-2">
                        <button
                            className="text-sm text-yellow-500 hover:underline"
                            onClick={() => onEdit(event)}
                        >
                            Edit
                        </button>
                        <button
                            className="text-sm text-red-500 hover:underline"
                            onClick={() => onCancel(event.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
