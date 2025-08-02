import { useState, useEffect } from "react";

interface InteractiveTitleProps {
  text: string;
  className?: string;
}

export const InteractiveTitle = ({ text, className = "" }: InteractiveTitleProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1 
      className={`text-6xl md:text-8xl font-bold text-shimmer ${isTyping ? 'typewriter' : ''} ${className}`}
      style={{
        borderRight: isTyping ? '2px solid hsl(var(--primary))' : 'none',
      }}
    >
      {displayText}
    </h1>
  );
};