import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "xanhduong-500": "var(--xanhduong-500)",
        "xanhduong-600": "var(--xanhduong-600)",
        "xanhduong-800": "var(--xanhduong-800)",
        "toreabay-100": "var(--torea-bay-100)",
        "toreabay-700": "var(--torea-bay-700)",
      },
    },
  },
  plugins: [],
  safelist: ["gradient-hover"],
};
export default config;
