const API_BASE_URL = "http://localhost:3000/api";

export async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events. Please try again later.");
  }
}

export async function fetchEventById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching event:", error);
    throw new Error("Failed to fetch event details. Please try again later.");
  }
}

export async function createEvent(eventData: FormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "POST",
      body: eventData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export async function updateEvent(id: string, eventData: FormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      body: eventData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update event");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

export async function deleteEvent(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete event");
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

export async function purchaseTickets(ticketData: {
  eventId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  quantity: number;
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/tickets/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to purchase tickets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error purchasing tickets:", error);
    throw error;
  }
}
