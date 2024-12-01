import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  MapPin,
  Sparkles,
  Upload,
  Users,
  Tag,
  DollarSign,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { createEvent } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { PromptTemplate } from "@langchain/core/prompts";
import { HfInference } from "@huggingface/inference";
import { RedirectToSignIn, useUser } from '@clerk/clerk-react'

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  price: number;
  imageUrl: BinaryData;
  category: string;
  tickets: { available: number; total: number };
  organizer: { name: string; contact: string };
}

interface FormData {
  title: string;
  description: string;
  location: string;
  price: number;
  category: string;
  totalTickets: number;
  organizerName: string;
  organizerContact: string;
  image?: File | null;
}

interface AIGeneratedEventDetails {
  title?: string;
  description?: string;
  price?: number;
  date?: Date;
  location?: string;
  category?: string;
  totalTickets?: number;
  imagePrompt?: string;
}

const apiKey = ""; // Add your API key here
const client = new HfInference(apiKey);
const eventPromptTemplate = new PromptTemplate({
  inputVariables: ["details"],
  template: `Based on the provided event details, generate a JSON object with the following fields:
    - title: A catchy title for the event.
    - description: A brief but engaging description.
    - price: Estimated ticket price in USD.
    - date: A suitable date in "MM/DD/YYYY" format.
    - location: A suitable location as in prompt.
    - category: A suitable category from option "music/tech/sports/arts".
    - imagePrompt: A creative text prompt to generate an event image.
    Event Details: {details}
    Output only the JSON object without additional text.`,
});

export default function CreateEvent() {
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [aiDescription, setAiDescription] = useState<string>("");

  const { user, isSignedIn } = useUser();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    location: "",
    price: 0,
    category: "",
    totalTickets: 0,
    organizerName: `${user?.firstName} ${user?.lastName}`,
    organizerContact: user?.emailAddresses[0].emailAddress || '',
    image: null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem("eventDraft");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveDraft = () => {
    localStorage.setItem("eventDraft", JSON.stringify(formData));
    toast.success("Draft saved successfully!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = async (prompt: string): Promise<string> => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: {
            Authorization: `Bearer key`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );
      const result = await response.blob();
      const imageObjectURL = URL.createObjectURL(result);
      setImagePreview(imageObjectURL);
      const imageFile = new File([result], "generated-event-image.png", {
        type: "image/png",
      });
      setFormData((prev) => ({ ...prev, image: imageFile }));
      toast.success("Image generated successfully!");
      return imageObjectURL;
    } catch (error) {
      toast.error("Failed to generate image");
      console.error("Image generation error:", error);
      return "";
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const generateWithAI = async (): Promise<void> => {
    if (!aiDescription.trim()) {
      toast.error("Please provide a description for AI generation");
      return;
    }

    setIsGenerating(true);

    try {
      const structuredDetails = `Create an event with the following details: ${aiDescription}`;
      const prompt = await eventPromptTemplate.format({
        details: structuredDetails,
      });

      const chatCompletion = await client.chatCompletion({
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1500,
        temperature: 0.6,
      });

      const output = String(chatCompletion.choices[0].message.content);
      const eventDetails = JSON.parse(output) as AIGeneratedEventDetails;

      if (eventDetails) {
        setFormData((prev) => ({
          ...prev,
          title: eventDetails.title || "",
          description: eventDetails.description || "",
          price: Number(eventDetails.price) || 0,
          location: eventDetails.location || "",
          category: eventDetails.category || "",
          totalTickets: Number(eventDetails.totalTickets) || 0,
          organizerName: "",
          organizerContact: "",
        }));

        if (eventDetails.imagePrompt) {
          await generateImage(eventDetails.imagePrompt);
        }

        toast.success("Event details generated successfully!");
      }
    } catch (error) {
      toast.error("Failed to generate event details");
      console.error("AI Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFormData((prev) => ({ ...prev, price: value }));
    }
  };

  const handleTicketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFormData((prev) => ({ ...prev, totalTickets: value }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!eventDate) {
      toast.error("Please select an event date");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log(JSON.stringify(formData));
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value) {
          formDataToSend.append("image", value);
        } else if (value) {
          formDataToSend.append(key, value.toString());
          console.log(JSON.stringify(formDataToSend));
        }
      });

      formDataToSend.append("date", eventDate.toISOString());
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }
      await createEvent(formDataToSend);

      // Clear local storage after successful submission
      localStorage.removeItem("eventDraft");
      toast.success("Event created successfully!");
      navigate("/events");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create event"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-800 rounded-lg shadow-xl p-8 border border-cream-100/20">
          <h1 className="text-4xl font-bold text-cream-100 mb-8">
            Create New Event
          </h1>
          <form onSubmit={handleSubmit}>
            {/* AI Quick Generate */}
            <div className="mb-8 bg-zinc-700 p-6 rounded-xl border border-cream-100/20">
              <label className="block text-lg font-semibold text-cream-100 mb-2">
                Quick Generate with AI
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-gray focus:ring-gray focus:border-transparent"
                placeholder="Describe your event in detail and let AI generate it for you..."
                rows={3}
                value={aiDescription}
                onChange={(e) => setAiDescription(e.target.value)}
              />
              <button
                type="button"
                onClick={generateWithAI}
                className="flex items-center space-x-2 px-6 py-3  bg-white  text-black rounded-xl hover:bg-cream-300 transition-all duration-300 shadow-lg"
                disabled={isGenerating || isGeneratingImage}
              >
                <Sparkles className="h-5 w-5" />
                <span>
                  {isGenerating
                    ? "Generating..."
                    : isGeneratingImage
                      ? "Creating Image..."
                      : "Generate"}
                </span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cream-100 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-zinc-700 text-cream-100 rounded-lg px-[10px] py-[10px] border border-gray focus:ring-gray focus:border-transparent"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cream-100 mb-[10px]">
                    Description
                  </label>
                  <textarea
                    required
                    className="w-full bg-zinc-700 text-cream-100 rounded-lg px-[10px] py-[10px] h-[100px] focus:outline-none focus:ring focus:ring-gray"
                    placeholder="Describe your event"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-[20px]">
                  <div>
                    <label className="text-sm font-medium text-white mb-[10px] flex items-center space-x-[10px]">
                      <Tag className="h-[15px] w-[15px]" />
                      <span>Category</span>
                    </label>
                    <select
                      required
                      className="w-full bg-zinc-700 text-white rounded-lg px-[10px] py-[10px] border border-gray focus:ring-gray focus:border-transparent"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select category</option>
                      <option value="music">Music</option>
                      <option value="tech">Tech</option>
                      <option value="sports">Sports</option>
                      <option value="arts">Arts</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white mb-[10px] flex items-center space-x-[10px]">
                      <Users className="h-[15px] w-[15px]" />
                      <span>Total Tickets</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="1"
                      placeholder="Max attendees"
                      value={formData.totalTickets}
                      onChange={handleTicketsChange}
                      className="w-full bg-zinc-700 text-white rounded-lg px-[10px] py-[10px] border border-gray focus:ring-gray focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-[20px]">
                <div>
                  <label className="block text-sm font-medium text-white mb-[10px]">
                    Event Image
                  </label>
                  <div className="mt-[5px] flex justify-center px-[20px] pt-[5px] pb-[5px] border border-dashed border-gray rounded-lg hover:border-white transition-colors">
                    {imagePreview ? (
                      <div className="relative w-full h-[200px]">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview("");
                            setFormData((prev) => ({ ...prev, image: null }));
                          }}
                          className="absolute top-[5px] right-[5px] bg-white text-black p-[5px] rounded-full hover:bg-red transition-colors"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-[5px] text-center">
                        <Upload className="mx-auto h-[40px] w-[40px] text-white" />
                        <div className="flex text-sm text-white justify-center ">
                          <label className="relative cursor-pointer p-2 bg-white rounded-md font-medium text-black hover:bg-cream-300 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-white">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date Picker */}
                <div>
                  <label className="text-sm font-medium text-white mb-[10px] flex items-center space-x-[10px]">
                    <CalendarIcon className="h-[15px] w-[15px]" />
                    <span>Date</span>
                  </label>
                  <DatePicker
                    selected={eventDate}
                    onChange={(date) => setEventDate(date)}
                    required
                    placeholderText="Select date"
                    className="w-full bg-zinc-700 text-white rounded-lg px-[10px] py-[10px] border border-gray focus:ring-gray focus:border-transparent"
                  />
                </div>

                {/* Price Input */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Price</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handlePriceChange}
                      className="w-full pl-[40px] pr-[10px] py-[10px] bg-zinc-700 text-white rounded-xl border border-gray"
                    />
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="text-sm font-medium text-white mb-[10px] flex items-center space-x-[10px]">
                    <MapPin className="h-[15px] w-[15px]" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full bg-zinc-700 text-white rounded-lg px-[10px] py-[10px] border border-gray"
                  />
                </div>

                {/* Organizer Details */}
                <div className="grid grid-cols-[1fr_1fr] gap-[20px]">
                  {/* Organizer Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray mb-[10px]">
                      Organizer Name
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      required
                      placeholder="Enter organizer name"
                      value={formData.organizerName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          organizerName: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-700 text-white px-[10px] py-[10px] rounded-xl border border-gray"
                    />
                  </div>

                  {/* Organizer Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray mb-[10px]">
                      Organizer Contact
                    </label>
                    <input
                      disabled={true}
                      type="email"
                      required
                      placeholder="Enter contact email"
                      value={formData.organizerContact}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          organizerContact: e.target.value,
                        }))
                      }
                      className="w-full bg-zinc-700 text-white px-[10px] py-[10px] rounded-xl border border-gray"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit and Save Draft Buttons */}
            {/* Assuming button layout is similar to others */}
            {/* Update this part with actual button usage */}

            {/* Save Draft Button */}
            {/* Create Event Button */}

            {/* Submit and Save Draft Buttons */}
            <div className="mt-[30px] flex justify-end space-x-[20px]">
              {/* Save Draft Button */}
              <button
                type="button"
                onClick={saveDraft}
                className="bg-zinc-100 rounded-full hover:bg-opacity[80%]
              transition duration=300 ease-in-out px-[20px]
               py-[12px]"
              >
                Save Draft
              </button>

              {/* Create Event Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-zinc-100 rounded-full hover:bg-opacity[80%]
                transition duration=300 ease-in-out px-[20px]
                py-[12px]'`}
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
