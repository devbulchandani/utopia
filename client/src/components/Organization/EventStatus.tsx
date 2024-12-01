import React from 'react';
import { Event } from '../../types/event';
import { getStatusColor } from '../../utils/eventStatus';

interface EventStatusProps {
    status: Event['status'];
}

export const EventStatus: React.FC<EventStatusProps> = ({ status }) => {
    const { bgColor, textColor } = getStatusColor(status);

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};