/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#F7F7F7",
        "secondary": "#EDEDED",
        "border-color": "#ECEEF6",
        "text-color": "#A0A3BD",
        "xr8": "#023E8A",
        "xr12": "#018DD7",
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

