import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Event } from '../../types/event'; 
import CountdownTimer from './CountdownTimer';
import CategoryBadge from './CategoryBadge';
import { getRelativeTimeString, getTimeStatus } from '../../utils/dateUtils';

interface TimelineEventProps {
    event: Event;
    isLive?: boolean;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event, isLive }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timeStatus = getTimeStatus(event.date);

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('en-US', { month: 'short' }),
            weekday: date.toLocaleString('en-US', { weekday: 'long' }),
        };
    };

    const dateInfo = formatDate(event.date);
    const relativeTime = getRelativeTimeString(event.date);

    const getStatusBadge = () => {
        switch (timeStatus) {
            case 'live':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900/50 text-red-200">
                        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-1"></span>
                        LIVE
                    </span>
                );
            case 'soon':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-200">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
                        STARTING SOON
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex gap-4 group">
            {/* Date Column */}
            <div className="w-32 text-right flex flex-col items-end pt-1">
                <div className="text-lg font-semibold text-zinc-200">{dateInfo.day}</div>
                <div className="text-sm text-zinc-400">{dateInfo.weekday}</div>
                <div className="text-xs text-zinc-500 mt-1">{relativeTime}</div>
            </div>

            {/* Timeline Line */}
            <div className="relative flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full mt-2 transition-colors ${timeStatus === 'live' ? 'bg-red-500 animate-pulse' :
                        timeStatus === 'soon' ? 'bg-yellow-500' : 'bg-zinc-600'
                    }`}></div>
                <div className="w-0.5 h-full bg-zinc-700 -mt-2"></div>
            </div>

            {/* Event Card */}
            <div className={`flex-1 bg-zinc-800/50 rounded-lg p-4 mb-8 backdrop-blur-sm border border-zinc-700/50 
        hover:border-zinc-600/50 transition-all group-hover:shadow-lg
        ${isExpanded ? 'ring-1 ring-zinc-500' : ''}`}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge()}
                            <CategoryBadge category={event.category} />
                        </div>

                        <h3 className="text-xl font-semibold text-zinc-100 mb-2">{event.title}</h3>
                        <p className="text-zinc-400 mb-4">{event.description}</p>

                        <div className="space-y-2">
                            <div className="flex items-center text-zinc-300">
                                <Clock className="w-4 h-4 mr-2 text-zinc-400" />
                                <span>{formatTime(event.date)}</span>
                            </div>
                            {event.location && (
                                <div className="flex items-center text-zinc-300">
                                    <MapPin className="w-4 h-4 mr-2 text-zinc-400" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </div>

                        {timeStatus === 'upcoming' && (
                            <div className="mt-4">
                                <CountdownTimer targetDate={event.date} />
                            </div>
                        )}
                    </div>

                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ml-4 relative group">
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                    </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-4 h-4 mr-1" />
                                Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-4 h-4 mr-1" />
                                Show more
                            </>
                        )}
                    </button>

                    <button
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeStatus === 'live'
                                ? 'bg-red-600 hover:bg-red-500 text-white'
                                : timeStatus === 'upcoming' || timeStatus === 'soon'
                                    ? 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                                    : 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                            }`}
                        disabled={timeStatus === 'past'}
                    >
                        
                    </button>
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-zinc-700/50 text-sm text-zinc-400">
                        <p>Registered on {new Date(event.registeredAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimelineEvent;