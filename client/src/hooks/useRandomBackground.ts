import { useState, useEffect } from "react";

const backgrounds = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
];

export const useRandomBackground = () => {
  const [background, setBackground] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const params = "?auto=format&fit=crop&w=2400&q=80";
    setBackground(`${backgrounds[randomIndex]}${params}`);
  }, []);

  return background;
};
