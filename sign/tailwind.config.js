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
		'blue': '#171926'

	},
	fontFamily:
	{

	},
	borderRadius:
	{
		
	},
	screens:
	{
		'custom': {'raw': '(min-width: 840px) and (max-width: 1680px)'},
		'one': {'raw': '(min-width: 640px) and (max-width: 1310px)'},
		'tow': {'raw': '(min-width: 500px) and (max-width: 1100px)'},
		'tree': {'raw': '(min-width: 150px) and (max-width: 1280px)'},
	},
  },
  plugins: [],
}
