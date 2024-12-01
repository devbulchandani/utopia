import React, { useState } from 'react';
import { sampleEvents } from '../data/sampleEvents';
import TimelineEvent from '../components/MyEvents/TimelineEvent'; 
import EventsHeader from '../components/MyEvents/EventHeader'; 

const MyEvents = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const now = new Date();
    const events = [...sampleEvents].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return activeTab === 'upcoming'
            ? eventDate >= now
            : eventDate < now;
    });

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100">
            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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
                                key={event.id}
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