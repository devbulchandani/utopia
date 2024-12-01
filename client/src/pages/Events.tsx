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
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // State for collapsible sections
  const [isEventTypeOpen, setEventTypeOpen] = useState(false);
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [isDateRangeOpen, setDateRangeOpen] = useState(false);
  const [isPriceRangeOpen, setPriceRangeOpen] = useState(false);

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearchQuery =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEventType = eventType ? event.category === eventType : true;
    const matchesLocation = location ? event.location.includes(location) : true;
    const matchesDateRange = dateRange
      ? new Date(event.date) >= new Date(dateRange)
      : true;
    const matchesPriceRange = priceRange
      ? event.price <= parseFloat(priceRange)
      : true;

    return (
      matchesSearchQuery &&
      matchesEventType &&
      matchesLocation &&
      matchesDateRange &&
      matchesPriceRange
    );
  });

  return (
    <div className="min-h-screen bg-black py-12 pt-[100px] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 ">
          <h1 className="text-3xl flex justify-center font-bold text-white mb-4">
            Upcoming Events
          </h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Filters</h2>

          {/* Event Type Filter */}
          <div>
            <button
              onClick={() => setEventTypeOpen(!isEventTypeOpen)}
              className="text-white bg-gray-700 p-2 rounded mb-2 w-full text-left"
            >
              Event Type
            </button>
            {isEventTypeOpen && (
              <select
                onChange={(e) => setEventType(e.target.value)}
                className="p-2 mb-4 w-full"
              >
                <option value="">All Types</option>
                <option value="Tech">Tech</option>
                <option value="Music">Music</option>
                <option value="Arts">Arts</option>
                {/* Add more categories as needed */}
              </select>
            )}
          </div>

          {/* Location Filter */}
          <div>
            <button
              onClick={() => setLocationOpen(!isLocationOpen)}
              className="text-white bg-gray-700 p-2 rounded mb-2 w-full text-left"
            >
              Location
            </button>
            {isLocationOpen && (
              <input
                type="text"
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 mb-4 w-full"
              />
            )}
          </div>

          {/* Date Range Filter */}
          <div>
            <button
              onClick={() => setDateRangeOpen(!isDateRangeOpen)}
              className="text-white bg-gray-700 p-2 rounded mb-2 w-full text-left"
            >
              Date Range
            </button>
            {isDateRangeOpen && (
              <input
                type="date"
                onChange={(e) => setDateRange(e.target.value)}
                className="p-2 mb-4 w-full"
              />
            )}
          </div>

          {/* Price Range Filter */}
          <div>
            <button
              onClick={() => setPriceRangeOpen(!isPriceRangeOpen)}
              className="text-white bg-gray-700 p-2 rounded mb-2 w-full text-left"
            >
              Price Range
            </button>
            {isPriceRangeOpen && (
              <input
                type="number"
                placeholder="Max Price"
                onChange={(e) => setPriceRange(e.target.value)}
                className="p-2 mb-4 w-full"
              />
            )}
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}
