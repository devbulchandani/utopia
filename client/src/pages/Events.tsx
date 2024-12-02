import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import { Event } from "../types/event";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [priceRange, setPriceRange] = useState("");

  // Fetch events from the backend API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error fetching events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearchQuery =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesEventType = eventType
      ? event.category.toLowerCase() === eventType.toLowerCase()
      : true;

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

  const clearAllFilters = () => {
    setSearchQuery("");
    setEventType("");
    setLocation("");
    setDateRange("");
    setPriceRange("");
  };
  console.log(JSON.stringify(events[0]));
  return (
    <div className="min-h-screen text-white pt-[60px] w-[90%] mx-auto">
      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="bg-gray-800 w-full lg:w-1/4 p-6 space-y-6 h-screen sticky top-0">
          <h2 className="text-2xl font-bold">Filters</h2>

          <SearchBar onSearch={setSearchQuery} />

          <div>
            <label className="block font-semibold mb-1">Event Type</label>
            <select
              onChange={(e) => setEventType(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="">All Types</option>
              <option value="Tech">Tech</option>
              <option value="Music">Music</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date Range</label>
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price Range</label>
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <button
            onClick={clearAllFilters}
            className="w-full bg-red-600 py-2 rounded font-semibold hover:bg-red-700"
          >
            Clear Filters
          </button>
        </aside>

        {/* Events Section */}
        <main className="flex-1 shadow-xl p-8 border border-cream-100/20 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg">No events match your filters.</p>
          )}
        </main>
      </div>
    </div>
  );
}
