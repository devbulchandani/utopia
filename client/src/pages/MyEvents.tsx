import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TimelineEvent from '../components/MyEvents/TimelineEvent';
import EventsHeader from '../components/MyEvents/EventHeader';

const MyEvents = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [events, setEvents] = useState<any[]>([]);
    const { userId } = useParams();

    const now = new Date();

    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:4000/api/events/user/${userId}/events`)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Fetched events:', data); // Inspect the structure
                    setEvents(data); // Ensure data is an array
                })
                .catch((error) => {
                    console.error('Error fetching events:', error);
                });
        }
    }, [userId]);

    console.log(events);
    const filteredEvents = Array.isArray(events)
    ? events.filter(event => {
        const eventDate = new Date(event.date);
        return activeTab === 'upcoming'
            ? eventDate >= now
            : eventDate < now;
    })
    : [];


    return (
        <div className="min-h-screen text-zinc-100 py-[60px]">
            <div className="max-w-5xl mx-auto shadow-xl p-8 border border-cream-100/20 px-4 sm:px-6 lg:px-8">
                <EventsHeader activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="space-y-4">
                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-zinc-400 text-lg">
                                No {activeTab} events found
                            </p>
                        </div>
                    ) : (
                        filteredEvents.map((event) => (
                            <TimelineEvent
                                key={event._id}
                                event={event}
                                isLive={
                                    new Date(event.date).getTime() <= now.getTime() &&
                                    new Date(event.date).getTime() + 3600000 > now.getTime()
                                }
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
