import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '../types/event';
import EventCard from '../components/Organization/EventCard';
import { AttendeeTable } from '../components/Organization/AttendeTable';
import { toast } from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { EventForm } from '../components/Organization/EventForm';
import { useNavigate, useParams } from 'react-router-dom';


export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);

    // Fetch events from the server
    useEffect(() => {
        const fetchUserEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/events/user/${userId}`);
                setEvents(response.data);
            } catch (err) {
                setError('Failed to load events for this user.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (userId) {
            fetchUserEvents();
        }
    }, [userId]);

    if (loading) {
        return <div className="text-center py-8">Loading events...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        setIsFormOpen(true);
    };

    const handleCancelEvent = async (eventId: string) => {
        console.log('Canceling event with ID:', eventId); // Log eventId

        try {
            await axios.patch(`http://localhost:4000/api/events/${eventId}`, { status: 'cancelled' });
            setEvents(events.map(event =>
                event._id === eventId ? { ...event, status: 'cancelled' as const } : event
            ));
            toast.success('Event cancelled successfully');
        } catch (error) {
            toast.error('Failed to cancel event.');
            console.error(error);
        }
    };

    const handleDeleteEvent = async (eventId: string) => {
        console.log('Deleting event with ID:', eventId); // Log eveß
        try {
            await axios.delete(`http://localhost:4000/api/events/${eventId}`);
            setEvents(events.filter(event => event._id !== eventId));
            toast.success('Event deleted successfully');
        } catch (error) {
            toast.error('Failed to delete event.');
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
                const updatedEvent = await axios.put(`http://localhost:4000/api/events/${selectedEvent._id}`, eventData);
                setEvents(events.map(event =>
                    event._id === selectedEvent._id ? updatedEvent.data : event
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] w-[80%]">
            <div className="shadow-xl p-8 border border-cream-100/20">
                <div className="flex justify-between items-center mb-8 ">
                    <h1 className="text-3xl font-bold text-zinc-100">Event Dashboard</h1>
                    <Button
                        onClick={() => {
                            navigate('/create')
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
                    {events.map((event) => (
                        <>
                        <EventCard
                            key={event._id}
                            event={event}
                            onEdit={handleEditEvent}
                            onCancel={(eventId) => handleCancelEvent(eventId)} // pass eventId correctly
                            onViewAttendees={handleViewAttendees}
                            onDelete={(eventId) => handleDeleteEvent(eventId)} // pass eventId correctly
                        />
                        </>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};
