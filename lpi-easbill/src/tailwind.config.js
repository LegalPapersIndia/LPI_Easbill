export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0B4F4A", light: "#E6F0EF" },
        paper: "#F5F6F3",
        border: "#E4E7E2",
        ink: { DEFAULT: "#16231F", muted: "#5B6B65" },
        status: { paid: "#1F9D55", pending: "#C17F1E", overdue: "#B3261E" },
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
};