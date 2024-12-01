import React, { useState } from "react";
import { Calendar, MapPin, Users, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";
import {EventDashboard} from "../components/EventDashboard";
import { Button } from "../components/ui/button";
import { EventCard } from "../components/EventCard";

const events = [
  {
    id: 1,
    title: "Tech Conference 2024",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2400&q=80",
    date: "March 15, 2024",
    location: "San Francisco, CA",
    attendees: 500,
    description:
      "Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.",
    tags: ["Technology", "Networking", "Innovation"],
  },
  {
    id: 2,
    title: "AI Summit",
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=2400&q=80",
    date: "April 2, 2024",
    location: "New York, NY",
    attendees: 300,
    description:
      "Explore the future of artificial intelligence with leading experts and hands-on demonstrations.",
    tags: ["AI", "Machine Learning", "Future Tech"],
  },
  {
    id: 3,
    title: "Blockchain Workshop",
    image:
      "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=2400&q=80",
    date: "April 15, 2024",
    location: "London, UK",
    attendees: 200,
    description:
      "Deep dive into blockchain technology with practical workshops and expert sessions.",
    tags: ["Blockchain", "Cryptocurrency", "Web3"],
  },
  {
    id: 4,
    title: "Design Systems Conference",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2400&q=80",
    date: "May 1, 2024",
    location: "Berlin, Germany",
    attendees: 250,
    description:
      "Learn about modern design systems and their implementation in large-scale applications.",
    tags: ["Design", "UI/UX", "Systems"],
  },
];

export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-black pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-display font-bold text-cream-100 mb-6">
              Upcoming Events
            </h1>
            <p className="text-lg text-cream-100/60 max-w-2xl mx-auto">
              Discover and join amazing events curated just for you
            </p>
          </div>

          {/* Filters */}
          <div className="mt-12 flex items-center justify-center gap-4">
            {["all", "technology", "design", "business"].map((category) => (
              <Button
                key={category}
                variant={filter === category ? "primary" : "secondary"}
                onClick={() => setFilter(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onSelect={() => setSelectedEvent(event)}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDashboard
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};
