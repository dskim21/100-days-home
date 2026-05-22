export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5f7a72',
          secondary: '#2f4540',
          main: '#7fa89b',
          hover: '#6f988b',
          soft: '#edf5f3',
          border: '#d8e4df',
          background: '#f5f7f6',
        },
      },

      borderRadius: {
        card: '28px',
        hero: '32px',
      },

      boxShadow: {
        card:
          '0 8px 20px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}