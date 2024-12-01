import React, { useState } from 'react';
import { Event } from '../../types/event';
import { Button } from '../ui/Button';

interface EventFormProps {
    event?: Event;
    onSubmit: (eventData: Partial<Event>) => void;
    onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: event?.title || '',
        description: event?.description || '',
        date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
        location: event?.location || '',
        capacity: event?.tickets.available || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            date: new Date(formData.date),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-zinc-300">
                    Event Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
                    Description
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-zinc-300">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="location" className="block text-sm font-medium text-zinc-300">
                    Location
                </label>
                <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-zinc-300">
                    Capacity
                </label>
                <input
                    type="number"
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-zinc-600 bg-zinc-700 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                    min="1"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <Button variant="secondary" type="button" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">
                    {event ? 'Update Event' : 'Create Event'}
                </Button>
            </div>
        </form>
    );
};