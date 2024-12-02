import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton, useAuth, UserButton } from "@clerk/clerk-react";
import WalletConnectButton  from "./ConnectWallet.tsx";

export const Navbar = () => {
  const { isSignedIn, userId } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasDashboard, setHasDashboard] = useState(false);

  useEffect(() => {
    const checkUserEvents = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:4000/api/events/user/${userId}/hasEvents`);
        const data = await response.json();
        setHasDashboard(data.hasEvents);
      } catch (error) {
        console.error("Error checking user events:", error);
      }
    };

    checkUserEvents();
  }, [userId]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 z-50 bg-black/30 backdrop-blur-md border border-cream-100/10 rounded-full px-6 py-2 w-full max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between gap-8">
        {/* Logo with Spin Effect */}
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            className="bg-gradient-to-r from-cream-100 to-cream-200 rounded-lg p-1.5"
            whileHover={{ rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-5 h-5 text-black" />
          </motion.div>
          <span className="text-cream-100 text-lg font-display font-bold">
            Utopia
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/events"
            className={`text-sm ${location.pathname === "/events"
              ? "text-cream-100"
              : "text-cream-100/60 hover:text-cream-100"
              } transition-colors`}
          >
            Events
          </Link>
          <Link
            to="/create"
            className={`text-sm ${location.pathname === "/create"
              ? "text-cream-100"
              : "text-cream-100/60 hover:text-cream-100"
              } transition-colors`}
          >
            Create Event
          </Link>
          {isSignedIn && (
            <>
              <Link
                to={`/user/${userId}/events`}
                className={`text-sm ${location.pathname === `/user/${userId}/events`
                  ? "text-cream-100"
                  : "text-cream-100/60 hover:text-cream-100"
                  } transition-colors`}
              >
                My Events
              </Link>
              {hasDashboard && (
                <Link
                  to={`/user/${userId}/dashboard`}
                  className={`text-sm ${location.pathname === `/user/${userId}/dashboard`
                    ? "text-cream-100"
                    : "text-cream-100/60 hover:text-cream-100"
                    } transition-colors`}
                >
                  Dashboard
                </Link>
              )}
            </>
          )}
        </div>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link
            className={`text-sm ${location.pathname === "/sign-in"
              ? "text-cream-100"
              : "text-cream-100/60 hover:text-cream-100"
              } transition-colors`}
            to="/sign-in"
          >
            Sign In
          </Link>
        </SignedOut>
        <WalletConnectButton />

      </div>
    </motion.nav>
  );
};
