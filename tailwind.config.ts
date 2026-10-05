const { defineConfig } = require('tailwindcss')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        mind: {
          50: '#f4f7ff',
          100: '#e7eeff',
          200: '#cdd9ff',
          300: '#a8bfff',
          400: '#7e9bf9',
          500: '#5d7cf5',
          600: '#415cd8',
          700: '#2f45a6',
          800: '#243a83',
          900: '#1d2f67'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(93, 124, 245, 0.35)'
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(circle at top left, rgba(93,124,245,0.28), transparent 35%), radial-gradient(circle at bottom right, rgba(135,206,250,0.18), transparent 30%)'
      }
    }
  },
  plugins: []
}
