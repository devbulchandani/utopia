import React, { useState } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import { Event } from "../types/event";

export default function EventsPage() {
  const sampleEvents: Event[] = [
    {
      id: "1",
      title: "Tech Conference 2024",
      description: "Join us for the biggest tech conference of the year",
      date: new Date("2024-06-15"),
      location: "San Francisco, CA",
      price: 299.99,
      imageUrl:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
      category: "Tech",
      tickets: {
        available: 150,
        total: 500,
      },
      organizer: {
        name: "TechEvents Inc",
        contact: "contact@techevents.com",
      },
    },
    {
      id: "2",
      title: "Summer Music Festival",
      description: "A weekend of amazing music under the stars",
      date: new Date("2024-07-20"),
      location: "Austin, TX",
      price: 149.99,
      imageUrl:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80",
      category: "Music",
      tickets: {
        available: 2000,
        total: 5000,
      },
      organizer: {
        name: "Festival Productions",
        contact: "info@festivalprods.com",
      },
    },
    {
      id: "3",
      title: "Art Gallery Opening",
      description: "Exclusive preview of contemporary art pieces",
      date: new Date("2024-05-10"),
      location: "New York, NY",
      price: 75.0,
      imageUrl:
        "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&q=80",
      category: "Arts",
      tickets: {
        available: 50,
        total: 200,
      },
      organizer: {
        name: "Metropolitan Gallery",
        contact: "gallery@metart.com",
      },
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = sampleEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black py-12 pt-[100px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h1 className="text-3xl flex justify-center font-bold text-white mb-4">
            Upcoming Events
          </h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
