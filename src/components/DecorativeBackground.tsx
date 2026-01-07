'use client';

import React from 'react';

export const DecorativeBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Top left - Star (Accent color) */}
      <svg
        className="absolute top-[10%] left-[10%] w-10 h-10 text-accent opacity-40 animate-float"
        style={{ animationDelay: '0s', transform: 'rotate(15deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      {/* Top right - Cloud (Info/Muted color) */}
      <svg
        className="absolute top-[15%] right-[5%] w-[60px] h-[60px] text-muted-foreground opacity-30 animate-float"
        style={{ animationDelay: '0.5s', transform: 'rotate(-10deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>

      {/* Middle left - Heart (Secondary color) */}
      <svg
        className="absolute top-[45%] left-[5%] w-9 h-9 text-secondary opacity-40 animate-float"
        style={{ animationDelay: '1s', transform: 'rotate(-20deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>

      {/* Bottom right - Sparkle/Creativity (Success/Primary color) */}
      <svg
        className="absolute bottom-[20%] right-[10%] w-[45px] h-[45px] text-primary opacity-40 animate-float"
        style={{ animationDelay: '1.5s', transform: 'rotate(25deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7.5 5.6L10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-8.8 9l-9 9c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0l9-9c.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0z" />
      </svg>

      {/* Bottom left - Pencil (Primary color, lighter) */}
      <svg
        className="absolute bottom-[10%] left-[15%] w-[50px] h-[50px] text-primary opacity-20 animate-float"
        style={{ animationDelay: '2s', transform: 'rotate(-45deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>

      {/* Middle right - Flower (Accent color) */}
      <svg
        className="absolute top-[60%] right-[15%] w-10 h-10 text-accent opacity-30 animate-float"
        style={{ animationDelay: '2.5s', transform: 'rotate(10deg)' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C9.24 2 7 4.24 7 7c0 1.38.56 2.63 1.46 3.54C5.25 11.07 3 13.49 3 16.5 3 19.54 5.46 22 8.5 22c1.25 0 2.41-.41 3.35-1.09.94.68 2.1 1.09 3.35 1.09 3.04 0 5.5-2.46 5.5-5.5 0-3.01-2.25-5.43-5.46-5.96.9-.91 1.46-2.16 1.46-3.54 0-2.76-2.24-5-5-5zm-3.5 18c-1.93 0-3.5-1.57-3.5-3.5 0-1.8 1.35-3.29 3.09-3.48.09.06.18.12.28.17-.09.92-.37 1.78-.82 2.56l1.73 1c.68-1.18 1.09-2.52 1.17-3.92.16-.03.33-.05.5-.05.17 0 .34.02.5.05.08 1.4.49 2.74 1.17 3.92l1.73-1c-.45-.78-.73-1.64-.82-2.56.1-.05.19-.11.28-.17 1.74.19 3.09 1.68 3.09 3.48 0 1.93-1.57 3.5-3.5 3.5-.88 0-1.69-.33-2.31-.87-.49.42-1.07.75-1.69.94-.62-.19-1.2-.52-1.69-.94-.62.54-1.43.87-2.31.87z" />
      </svg>

      {/* Additional small decorative elements */}
      <svg
        className="absolute top-[30%] right-[25%] w-6 h-6 text-accent opacity-25 animate-float"
        style={{ animationDelay: '0.3s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="12" cy="12" r="12" />
      </svg>

      <svg
        className="absolute bottom-[35%] left-[25%] w-7 h-7 text-accent opacity-30 animate-float"
        style={{ animationDelay: '0.7s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>

      <svg
        className="absolute top-[70%] left-[8%] w-5 h-5 text-secondary opacity-35 animate-float"
        style={{ animationDelay: '1.2s' }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    </div>
  );
};
