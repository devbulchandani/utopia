import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";

interface EventDashboardProps {
  event: {
    id: number;
    title: string;
    image: string;
    date: string;
    location: string;
    attendees: number;
    description?: string;
    tags?: string[];
  };
  onClose: () => void;
}

export const EventDashboard: React.FC<EventDashboardProps> = ({
  event,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    const element = fullscreenRef.current;

    if (!document.fullscreenElement) {
      if (element?.requestFullscreen) {
        element
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => {
            console.error("Error attempting to enable fullscreen:", err);
          });
      }
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => {
          console.error("Error attempting to exit fullscreen:", err);
        });
    }
  }, []);

  // Add fullscreen change event listener
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "attendees", label: "Attendees" },
    { id: "discussions", label: "Discussions" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
      >
        <motion.div
          ref={fullscreenRef}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="fixed inset-4 bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-cream-100/10"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="relative h-72">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Button
                  onClick={toggleFullscreen}
                  variant="secondary"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button
                  onClick={onClose}
                  variant="secondary"
                  size="sm"
                  className="bg-black/50 hover:bg-black/70"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="absolute bottom-4 left-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-cream-100 mb-2"
                >
                  {event.title}
                </motion.h1>
                <div className="flex items-center gap-4 text-cream-100/80">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-cream-100/10">
              <div className="flex items-center gap-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 relative ${
                      activeTab === tab.id
                        ? "text-cream-100"
                        : "text-cream-100/60 hover:text-cream-100"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-cream-100"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6"
                >
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold text-cream-100 mb-2">
                          About Event
                        </h2>
                        <p className="text-cream-100/60">{event.description}</p>
                      </div>
                      {event.tags && (
                        <div>
                          <h3 className="text-lg font-semibold text-cream-100 mb-2">
                            Tags
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-cream-100/10 text-cream-100/80 text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
