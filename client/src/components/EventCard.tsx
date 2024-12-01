import React from "react";
import { Calendar, MapPin, Users, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    image: string;
    date: string;
    location: string;
    attendees: number;
    description: string;
    tags: string[];
  };
  onSelect: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cream-100/10 hover:border-cream-100/20 transition-colors"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {event.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-black/50 backdrop-blur-sm text-cream-100/80 border border-cream-100/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-cream-100 mb-3">
          {event.title}
        </h3>

        <p className="text-cream-100/60 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-cream-100/80 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {event.date}
          </div>
          <div className="flex items-center text-cream-100/80 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-cream-100/80 text-sm">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees} attendees
          </div>
        </div>

        <Button
          onClick={onSelect}
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cream-100 to-cream-200 text-black hover:opacity-90"
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>
    </motion.div>
  );
};
