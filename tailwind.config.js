/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#6200EE',
        secondary: '#03DAC6',
        background: '#000000',
        error: '#B00020',
      },
    },
  },
  plugins: [],
}; 