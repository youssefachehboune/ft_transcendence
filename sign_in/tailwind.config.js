/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
	colors: 
	{
		'white': '#FFFFFF',
		'orange': '#FF3B22',
		'blue': '#171926',
		'green': '#05494a',
		'Sky' : '#00BABC',

	},
	screens:
	{
		'for': {'raw': '(min-width: 100px) and (max-width: 540px)'},
		'one': {'raw': '(min-width: 540px) and (max-width: 700px)'},
		'five': {'raw': '(min-width: 700px) and (max-width: 1023px)'},
	},
	boxShadow:
	{
		'shdow': '0px 40px 18px 0px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
	},
  },
  plugins: [],
}
