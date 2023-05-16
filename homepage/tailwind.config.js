/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: 
      {
        'white': '#FFFFFF',
        'orange': '#FF3B22',
        'blue': '#171926',
        'green': '#05494a',
        'Sky' : '#00BABC',
        'test': 'rgba(255, 255, 255, 0.15)',
        'my-bg' : '#171926',

      },
      textColor: {
        'my-text' : '#F5F5F5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens:
      {
          'phone': {'raw': '(min-width: 100px) and (max-width: 540px)'},
          'Large-phone': {'raw': '(min-width: 540px) and (max-width: 700px)'},
          'laptop': {'raw': '(min-width: 700px) and (max-width: 1024px)'},
      },
      fontFamily: 
      {
          'lato': ["Lato", "sans-serif"],
          'fredoka': ["Fredoka", "sans-serif"],
          'ibm-plex-sans': ["IBM Plex Sans", "sans-serif"],
          'ibm-plex-sans-kr': ["IBM Plex Sans KR", "sans-serif"],
      },
      fontWeight:
      {
          extrabold: '800',
          semibold: '600',
          medium: '500',
      },
    },
  },
  plugins: [],
}
