import React from "react";
import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface ParallaxSectionProps {
  image: string;
  height?: string;
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  image,
  height = "h-screen",
  children,
  className,
  overlay = true,
}) => {
  return (
    <Parallax
      blur={0}
      bgImage={image}
      strength={200}
      className={cn("relative", height, className)}
    >
      {overlay && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-full"
      >
        {children}
      </motion.div>
    </Parallax>
  );
};
