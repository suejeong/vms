/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',

        black400: '#131313',
        black300: '#212121',
        black200: '#282828',
        black100: '#2e2e2e',

        gray400: '#333333',
        gray300: '#4b4b4b',
        gray200: '#747474',
        gray100: '#d8d8d8',

        brand: {
          orange: '#eb5230',
        },

        primary: {
          blue: '#558fff',
        },

        error: {
          red: '#c41013',
          green: '#008489',
        },

        loading: {
          orange: '#ff5722',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
