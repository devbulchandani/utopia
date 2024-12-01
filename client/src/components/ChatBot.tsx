import React, { useState } from "react";
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-96 bg-black rounded-lg shadow-xl border border-zinc-800"
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <h3 className="text-white font-medium">AI Event Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-zinc-400" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>
            <div className="h-96 p-4 overflow-y-auto bg-zinc-900">
              <div className="space-y-4">
                <div className="bg-zinc-800 rounded-lg p-3 max-w-[80%]">
                  <p className="text-white">
                    How can I assist with your event today?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-zinc-800 bg-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-zinc-800"
                />
                <Button variant="primary" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 bg-black rounded-lg shadow-xl border border-zinc-800 p-4 flex items-center justify-between w-64"
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span className="text-white">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1 hover:bg-zinc-800 rounded-md transition-colors"
            >
              <Maximize2 className="w-4 h-4 text-zinc-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && !isMinimized && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg bg-black hover:bg-zinc-900 text-cream-100 border border-cream-100/20"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};
