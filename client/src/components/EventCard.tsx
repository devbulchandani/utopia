import React from "react";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import { Event } from "../types/event";
import { format } from "date-fns";
import EventDetailsModal from "../components/EventDetailsModal";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <div
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
            >
                <img
                    src={event.imageUrl || "fallback-image-url.jpg"}
                    alt={event.title || "Event Image"}
                    className="w-full h-48 object-cover"
                />
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {event.title || "Untitled Event"}
                    </h3>
                    <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>
                                {event.date
                                    ? format(new Date(event.date), "PPP")
                                    : "Date not available"}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="h-5 w-5 mr-2" />
                            <span>{event.location || "Location not specified"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-5 w-5 mr-2" />
                            <span>${event.price || 0}</span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-purple-600 h-full rounded-full"
                                style={{
                                    width: `${event.tickets?.total > 0
                                            ? (event.tickets?.available / event.tickets?.total) * 100
                                            : 0
                                        }%`,
                                }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            {event.tickets?.available || 0} tickets left
                        </p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsModalOpen(true);
                        }}
                        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                    >
                        Buy Ticket
                    </button>
                </div>
            </div>

            <EventDetailsModal
                event={event}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
