import React from "react";
import { ImagePlus, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../components/ui/button";

export const CreateEvent = () => {
  return (
    <div className="min-h-screen py-12 pt-[80px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-cream-100 mb-8">
          Create New Event
        </h1>

        <div className="space-y-8">
          {/* Event Cover */}
          <div className="bg-zinc-900 rounded-lg p-8 border border-cream-100/20">
            <div className="flex items-center justify-center h-64 bg-zinc-700 rounded-lg border-2 border-dashed border-cream-100/20">
              <div className="text-center">
                <ImagePlus className="w-12 h-12 text-cream-100/60 mx-auto mb-2" />
                <p className="text-cream-100/60">
                  Click to upload event cover image
                </p>
                <p className="text-sm text-cream-100/40">
                  or use AI to generate one
                </p>
              </div>
            </div>
          </div>

          {/* Event Details Form */}
          <div className="bg-zinc-800 rounded-lg p-8 border border-cream-100/20">
            <div className="space-y-6">
              <div>
                <label className="block text-cream-100 mb-2">Event Title</label>
                <input
                  type="text"
                  className="w-full bg-zinc-700 text-cream-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cream-100/50"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-cream-100 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-100/60" />
                    <input
                      type="date"
                      className="w-full bg-zinc-700 text-cream-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cream-100/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-cream-100 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream-100/60" />
                    <input
                      type="text"
                      className="w-full bg-zinc-700 text-cream-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cream-100/50"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-cream-100 mb-2">Description</label>
                <textarea
                  className="w-full bg-zinc-700 text-cream-100 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-cream-100/50"
                  placeholder="Describe your event..."
                />
                <Button variant="secondary" size="sm" className="mt-2">
                  Generate with AI
                </Button>
              </div>

              <div>
                <label className="block text-cream-100 mb-2">
                  <Users className="inline-block w-5 h-5 mr-2" />
                  Capacity
                </label>
                <input
                  type="number"
                  className="w-full bg-zinc-700 text-cream-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cream-100/50"
                  placeholder="Enter maximum capacity"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Event</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
