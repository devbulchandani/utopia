import React from "react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-cream-100/10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-2xl border border-cream-100/10">
          <div className="flex items-start gap-6">
            <div className="bg-gradient-to-br from-cream-100/20 to-cream-200/20 p-4 rounded-xl">
              <Sparkles className="w-8 h-8 text-cream-100" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-display text-cream-100 mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-cream-100/60 mb-4">
                Get updates about new features and event management tips
              </p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-black/50 border border-cream-100/20 rounded-lg px-4 py-2 text-cream-100 placeholder:text-cream-100/40 focus:outline-none focus:ring-2 focus:ring-cream-100/20"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-16">
          <div>
            <h4 className="text-cream-100/40 uppercase text-sm font-medium mb-4">
              Developer
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/docs"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/api"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Get API Key
                </Link>
              </li>
              <li>
                <Link
                  to="/examples"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Example Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100/40 uppercase text-sm font-medium mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/features"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/ai"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100/40 uppercase text-sm font-medium mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream-100/40 uppercase text-sm font-medium mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-cream-100"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-16 mt-16 border-t border-cream-100/10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-cream-100 to-cream-200 rounded-lg p-1.5">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-cream-100/60">
              © {currentYear} Utopia. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-cream-100/60 text-sm">
              All services are online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
