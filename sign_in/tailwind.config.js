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
		'mix': 'linear-gradient(180.7deg, #000000 27.28%, rgba(0, 0, 0, 0) 103.93%)',
		'mix-tow': ' linear-gradient(181.51deg, #FF3B22 45.75%, rgba(0, 0, 0, 0) 130.08%)'
      },
    },
	colors: 
	{
		'white': '#FFFFFF',
		'orange': '#FF3B22',
		'blue': '#171926',
		'green': '#05494a',
		'Sky' : '#00BABC',
		'test': 'rgba(255, 255, 255, 0.15)',

	},
	screens:
	{
		'phone': {'raw': '(min-width: 100px) and (max-width: 539px)'},
		'Large-phone': {'raw': '(min-width: 540px) and (max-width: 700px)'},
		'laptop': {'raw': '(min-width: 700px) and (max-width: 1024px)'},
	},
	boxShadow:
	{
		'shdow': '0px 40px 18px 0px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
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
  plugins: [],
}
