import React from "react";
import { ArrowRight, Sparkles, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ChatBot } from "../components/ChatBot";
import { FeaturedCompanies } from "../components/FeaturedCompanies";
import { useRandomBackground } from "../hooks/useRandomBackground";
import { ParallaxSection } from "../components/ParallaxSection";

export const Home = () => {
  const heroBackground = useRandomBackground();
  const communityBackground = useRandomBackground();

  return (
    <div className="min-h-screen bg-black text-cream-100">
      {/* Hero Section */}
      <ParallaxSection image={heroBackground} height="h-screen">
        <div className="relative pt-32 pb-20 px-4 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto text-center"
          >
            <h1 className="text-7xl font-display font-bold mb-8 bg-gradient-to-r from-cream-100 to-cream-300 bg-clip-text text-transparent">
              We're on a mission to
              <br />
              revolutionize events
            </h1>
            <p className="text-xl text-cream-100/60 max-w-2xl mx-auto mb-12">
              Transform your event planning experience with AI-powered tools.
              Create, manage, and host events seamlessly.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-cream-100 text-black hover:bg-cream-200"
              >
                Create Event <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cream-100 text-cream-100"
              >
                Explore Events
              </Button>
            </div>
          </motion.div>
        </div>

        <FeaturedCompanies />
      </ParallaxSection>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: "AI-Powered Planning",
              description:
                "Let AI handle the complexities of event planning while you focus on what matters.",
              color: "from-blue-500/20 to-blue-500/10",
            },
            {
              icon: Users,
              title: "Community Driven",
              description:
                "Connect with like-minded individuals and grow your network through events.",
              color: "from-purple-500/20 to-purple-500/10",
            },
            {
              icon: Sparkles,
              title: "Smart Analytics",
              description:
                "Get detailed insights and analytics to make your events even better.",
              color: "from-pink-500/20 to-pink-500/10",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl border border-cream-100/20 bg-gradient-to-br ${feature.color}`}
            >
              <feature.icon className="w-10 h-10 text-cream-100 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-cream-100">
                {feature.title}
              </h3>
              <p className="text-cream-100/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Section */}
      <ParallaxSection image={communityBackground} className="h-screen">
        <div className="relative max-w-full mx-auto px-4 py-20 min-h-screen">
          <h2 className="text-4xl font-display font-bold text-center mb-16">
            Join our Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6">
            {" "}
            {/* Adjusted gap for better spacing */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-px bg-gradient-to-r from-cream-100 to-cream-200 rounded-xl blur opacity-[0.15] group-hover:opacity-[0.25] transition duration-[300ms]" />{" "}
                {/* Adjusted inset for better alignment */}
                <div className="relative p-6 bg-black rounded-xl">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1550000000000 + i
                    }?auto=format&fit=crop&w=800&q=80`}
                    alt={`Community Meetup ${i}`}
                    className="w-full h-auto object-cover rounded-lg mb-4" // Ensured responsive image handling
                  />
                  <h3 className="text-xl font-bold mb-2">
                    Community Meetup #{i}
                  </h3>
                  <p className="text-cream-100/60">
                    Join our next community meetup and connect with event
                    planners worldwide.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Chatbot Section */}
      
    </div>
  );
};
