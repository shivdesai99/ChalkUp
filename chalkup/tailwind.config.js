/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4169E1", // Royal Blue
        background: "#333333", // Charcoal Grey
        surface: "#444444", // Slightly lighter grey for cards/modals
        textPrimary: "#FFFFF0", // Ivory White for main text
        textSecondary: "#F5F5DC", // Softer Ivory White for secondary text
        border: "#000000", // Jet Black
        accent: "#4169E1", // Same as primary for focused states
      },
      fontSize: {
        sm: "14px", // Small font size
        md: "16px", // Medium font size
        lg: "20px", // Large font size
        xl: "24px", // Extra large font size
      },
      spacing: {
        xs: "4px", // Extra small spacing
        sm: "8px", // Small spacing
        md: "16px", // Medium spacing
        lg: "24px", // Large spacing
        xl: "32px", // Extra large spacing
      },
      borderRadius: {
        sm: "4px", // Slightly rounded
        md: "8px", // Default rounding
        lg: "12px", // Larger rounding
        xl: "16px", // Fully rounded
      },
      boxShadow: {
        subtle: "0 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for depth
        medium: "0 4px 8px rgba(0, 0, 0, 0.15)", // Medium shadow for cards/modals
        strong: "0 6px 12px rgba(0, 0, 0, 0.2)", // Strong shadow for emphasis
      },
    },
  },
  plugins: [],
};
