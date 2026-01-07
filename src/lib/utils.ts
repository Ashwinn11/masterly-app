import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFriendlyErrorMessage(error: any): string {
  if (!error) return "Something went wrong. Please try again.";

  const message = typeof error === "string" ? error : error.message || "";

  if (message.includes("failed to fetch") || message.includes("network error") || message.includes("Failed to send a request")) {
    return "Upload failed. Please check your internet connection or try a smaller file.";
  }

  if (message.includes("non-2xx status code") || message.includes("Edge Function returned")) {
    return "The server had trouble processing this. Please try again in a moment.";
  }

  if (message.includes("timeout") || message.includes("execution time limit")) {
    return "The operation took too long. Please try a smaller file or shorter text.";
  }

  if (message.includes("No questions could be generated")) {
    return "We couldn't generate questions from this content. Try adding more detail or clearer text.";
  }

  if (message.includes("microphone") || message.includes("permission")) {
    return "Microphone access denied. Please enable it in your browser settings.";
  }

  if (message.includes("Unsupported file type")) {
    return "This file type isn't supported. Please use PDF, JPG, PNG, or common audio formats.";
  }

  if (message.includes("too large") || message.includes("10MB")) {
    return "File is too large. Please keep it under 10MB.";
  }

  if (message.includes("speech") || message.includes("transcribe") || message.includes("audio") || message.includes("text found") || message.includes("readable text")) {
    return message;
  }

  return message || "An unexpected error occurred. Please try again or contact support if it persists.";
}
