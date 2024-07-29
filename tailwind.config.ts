const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'science-blue': {
          50: '#F1F7FE',
          100: '#E3ECFB',
          200: '#C0D9F7',
          300: '#888BF1',
          400: '#4998E7',
          500: '#227BD5',
          600: '#1565C0',
          700: '#114C93',
          800: '#153965',
          900: '#0E2443',
          950: '#153965', // Ensure consistency for color value
        },
      },
    },
  },
  plugins: [],
});