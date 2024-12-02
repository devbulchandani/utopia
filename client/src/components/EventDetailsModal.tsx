import React, { useEffect, useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  DollarSign,
  User,
  Mail,
  Phone,
  IndianRupee,
} from "lucide-react";
import { Event } from "../types/event";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useUser } from '@clerk/clerk-react';
import axios from "axios";

interface EventDetailsModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

interface TicketFormData {
  name: string;
  email: string;
  phone: string;
  quantity: number;
}

export default function EventDetailsModal({
  event,
  isOpen,
  onClose,
}: EventDetailsModalProps) {
  const { user } = useUser();
  const [step, setStep] = useState<"details" | "ticket">("details");
  const [ticketData, setTicketData] = useState<TicketFormData>({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
  });

  useEffect(() => {
    if (user) {
      setTicketData((prev) => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`,
        email: user.emailAddresses?.[0]?.emailAddress || '',
      }));
    }
  }, [user]);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEvent = {
      ...event,
      registered: [
        ...event.registered,
        {
          name: ticketData.name,
          email: ticketData.email,
          phone: ticketData.phone,
          quantity: ticketData.quantity,
        },
      ],
    };

    try {
      await axios.patch(`http://localhost:4000/api/events/${event._id}/register`, {
        registered: updatedEvent.registered,
      });

      onClose();
      setStep("details");

      toast.success("Tickets booked successfully!");
    } catch (error) {
      toast.error("Failed to book tickets. Please try again.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen  px-4 pt-4 pb-20 text-center text-black sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl border-4 border-gray-900 shadow-xl">
          {/* Header */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-72 object-cover"
            />
          </div>

          {step === "details" && (
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 mb-6">{event.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3" />
                      <span>{format(new Date(event.date), "PPP")}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-5 w-5 mr-3" />
                      <span>{event.price}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gray-50 border border-gray-900 text-black p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4">
                      Ticket Information
                    </h3>
                    <div className="space-y-2">
                      <p>Available Tickets: {event.tickets?.available}</p>
                      <p>Total Capacity: {event.tickets?.total}</p>
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full"
                            style={{
                              width: `${(event.tickets?.available /
                                event.tickets?.total) *
                                100
                                }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setStep("ticket")}
                      className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                    >
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "ticket" && (
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">Book Tickets</h3>
              <form onSubmit={handleTicketSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        required
                        disabled
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={user?.fullName || ticketData.name} // Fill name from Clerk
                        onChange={(e) =>
                          setTicketData({ ...ticketData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        required
                        disabled
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={user?.emailAddresses[0].emailAddress || ticketData.email} // Fill email from Clerk
                        onChange={(e) =>
                          setTicketData({
                            ...ticketData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        required
                        className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        value={ticketData.phone}
                        onChange={(e) =>
                          setTicketData({
                            ...ticketData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Tickets
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={Math.min(event.tickets?.available || 0, 5)}
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      value={ticketData.quantity}
                      onChange={(e) =>
                        setTicketData({
                          ...ticketData,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  >
                    Book Tickets
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
