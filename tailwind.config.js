/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0C11",
          900: "#0E1116",
          800: "#151A22",
          700: "#1D232D",
          600: "#2A313D",
          500: "#3A4250",
        },
        parchment: {
          100: "#F4F2ED",
          200: "#E7E3D9",
          300: "#C9C4B6",
        },
        bronze: {
          400: "#D3B06A",
          500: "#B8924A",
          600: "#96733A",
          700: "#6E5329",
        },
        steel: {
          400: "#7C93A6",
          500: "#57718A",
          600: "#3F5468",
        },
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        edge: "0 1px 0 0 rgba(211,176,106,0.15)",
      },
    },
  },
  plugins: [],
};
