/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/preset")

module.exports = {
  presets:[nativewind],
  content: ["./app/**/*.{js,jsx,ts,tsx}","./app/*.{js,jsx,ts,tsx}","./App.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
}

