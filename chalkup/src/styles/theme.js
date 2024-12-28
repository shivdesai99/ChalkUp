const theme = {
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
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4, // Slightly rounded
        md: 8, // Default rounding
        lg: 12, // Larger rounding
        xl: 16, // Fully rounded
    },
    boxShadow: {
        subtle: "0 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow for depth
        medium: "0 4px 8px rgba(0, 0, 0, 0.15)", // Medium shadow for cards/modals
        strong: "0 6px 12px rgba(0, 0, 0, 0.2)", // Strong shadow for emphasis
    },
};
console.log("Theme object:", theme);


export default theme;  