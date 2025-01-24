import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'tiny': "470px",
        'sm': "600px",
        'md': "769px",
        'lg': "1025px",
        'xl': "1200px",
        '1.5xl': "1500px",
        '2xl': "1600px"
      },
      colors: {
        myGreen: '#80C342',
        myBlack: '#323434',
        myYellow: '#FAC107',
        myPink: '#FF7979',
        myGray: '#e8e8e8',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
