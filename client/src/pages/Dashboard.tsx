import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '../types/event';
import EventCard from '../components/EventCard';
import { AttendeeTable } from '../components/Organization/AttendeTable';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EventForm } from '../components/Organization/EventForm';

export const Dashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);

    // Fetch events from the server
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/events');
                setEvents(response.data);
            } catch (err) {
                setError('Failed to load events.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsFormOpen(true);
    };

    const handleCancelEvent = async (eventId: string) => {
        try {
            await axios.patch(`http://localhost:4000/api/events/${eventId}`, { status: 'cancelled' });
            setEvents(events.map(event =>
                event.id === eventId ? { ...event, status: 'cancelled' as const } : event
            ));
            toast.success('Event cancelled successfully');
        } catch (error) {
            toast.error('Failed to cancel event.');
            console.error(error);
        }
    };

    const handleViewAttendees = (event: Event) => {
        setSelectedEvent(event);
        setIsAttendeeModalOpen(true);
    };

    const handleSubmitEvent = async (eventData: Partial<Event>) => {
        try {
            if (selectedEvent) {
                const updatedEvent = await axios.put(`http://localhost:4000/api/events/${selectedEvent.id}`, eventData);
                setEvents(events.map(event =>
                    event.id === selectedEvent.id ? updatedEvent.data : event
                ));
                toast.success('Event updated successfully');
            } else {
                const newEvent = await axios.post('http://localhost:4000/api/events', eventData);
                setEvents([...events, newEvent.data]);
                toast.success('Event created successfully');
            }
        } catch (error) {
            toast.error('Failed to save event.');
            console.error(error);
        } finally {
            setIsFormOpen(false);
            setSelectedEvent(null);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading events...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-zinc-100">Event Dashboard</h1>
                <Button
                    onClick={() => {
                        setSelectedEvent(null);
                        setIsFormOpen(true);
                    }}
                >
                    Create New Event
                </Button>
            </div>

            <Modal
                isOpen={isFormOpen}
                title={selectedEvent ? 'Edit Event' : 'Create New Event'}
            >
                <EventForm
                    event={selectedEvent || undefined}
                    onSubmit={handleSubmitEvent}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setSelectedEvent(null);
                    }}
                />
            </Modal>

            <Modal
                isOpen={isAttendeeModalOpen}
                title={selectedEvent ? `Attendees - ${selectedEvent.title}` : 'Attendees'}
            >
                <div className="space-y-6">
                    {selectedEvent && (
                        <AttendeeTable attendees={selectedEvent.registered} />
                    )}
                    <div className="flex justify-end">
                        <Button
                            variant="secondary"
                            onClick={() => setIsAttendeeModalOpen(false)}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onEdit={handleEditEvent}
                        onCancel={handleCancelEvent}
                        onViewAttendees={handleViewAttendees}
                    />
                ))}
            </div>
        </div>
    );
};
