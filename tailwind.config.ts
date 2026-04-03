import type { Config } from "tailwindcss";

const config: Config = {
  // CRITICAL: This tells Tailwind where to find your styles
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A192F",
      },
    },
  },
  plugins: [],
};
export default config;
