/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      width: {
        '0': '0',
        '64': '16rem'
      }
    },
  },
  plugins: [],
}

