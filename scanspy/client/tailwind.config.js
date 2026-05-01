/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0a0e1a",
          surface: "#111827",
          border: "#1f2937",
          teal: "#00d4aa",
          warning: "#f59e0b",
          danger: "#ef4444",
          success: "#10b981",
        },
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "JetBrains Mono", "monospace"],
        heading: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 212, 170, 0.35)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s infinite linear",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
