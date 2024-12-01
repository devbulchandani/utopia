import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { Footer } from "./components/Footer.tsx";
import { Home } from "./pages/Home.tsx";
import { Events } from "./pages/Events.tsx";
import { CreateEvent } from "./pages/CreateEvent.tsx";
import SignInPage from "./pages/sign-in.tsx";
import { ChatBot } from "./components/ChatBot.tsx";
import MyEvents from "./pages/MyEvents.tsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black  flex flex-col items-center pt-10">
        <Navbar />
        <main className="flex-1 w-full min-h-screen">
          {" "}
          {/* Adjusted max-width and added padding */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/user/:userId/events" element={<MyEvents />} />
          </Routes>
          {/* Chatbot Section */}
          <ChatBot />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
