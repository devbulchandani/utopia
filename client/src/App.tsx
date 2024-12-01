import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.tsx";
import { Footer } from "./components/Footer.tsx";
import { Home } from "./pages/Home.tsx";
import Events  from "./pages/Events.tsx";
import CreateEvent from "./pages/CreateEvent";
import ChatBot from "./components/ChatBot.tsx"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col items-center ">
        <Navbar />
        <main className="flex-1 w-full min-h-screen">
          {" "}
          {/* Adjusted max-width and added padding */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/create" element={<CreateEvent />} />
          </Routes>
          {/* Chatbot Section */}
          <ChatBot />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
