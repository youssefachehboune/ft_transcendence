/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
	  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        'my-bg' : '#070012',
		'rgb-color': 'rgba(255, 255, 255, 0.15)',

      },
      textColor: {
		
        'my-text' : '#F5F5F5',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
		  'mix': 'linear-gradient(180.7deg, #000000 27.28%, rgba(0, 0, 0, 0) 112.93%)',
		  'mix-tow': ' linear-gradient(181.51deg, #00DAEA 45.75%, rgba(0, 0, 0, 0) 105.08%)'
      },
      screens:
      {
          'phone': {'raw': '(min-width: 100px) and (max-width: 540px)'},
          'Large-phone': {'raw': '(min-width: 541px) and (max-width: 700px)'},
          'laptop': {'raw': '(min-width: 700px) and (max-width: 1024px)'},
		  'desktop': {'raw': '(min-width: 1025px) and (max-width: 1450px)'},
		  'xl': {'max': '768px'},
		  '2xl': {'raw': '(min-width: 768px) and (max-width: 1300px)'},
      },
      fontFamily: 
      {
		  'lato': ["Lato", "sans-serif"],
		'fredoka': ["Fredoka", "sans-serif"],
		'ibm-plex-sans': ["IBM Plex Sans", "sans-serif"],
		'ibm-plex-sans-kr': ["IBM Plex Sans KR", "sans-serif"],
		'sora': ["Sora", "sans-serif"],

		},
		fontWeight:
		{
			extrabold: '800',
			semibold: '600',
			medium: '500',
			light: '300',
			regular: '400',
			bold: '700',
		},
		boxShadow:
		{
			'shdow': '0px 40px 18px 0px rgba(0,0,0,0.1), 0px 10px 15px -3px rgba(0,0,0,0.1)',
		},
		keyframes: {
			'rectangel-right': {
				'from': { top: '-200px', marginRight: '-350px' },
				'to': { top: '0px' },
			},
			'rectangel-left': {
				'from': {bottom: '-200px', marginLeft: '-250px'},
				'to': {bottom: '0px'},
			},
			'text-animation': {
				'from': {right: '-200px'},
				'to': {right: '5%'},
			},
     	},
		animation: {
        	'rectangel-right': 'rectangel-right 1.4s ease',
			'rectangel-left': 'rectangel-left 1.4s ease',
			'text-animation': 'text-animation 1.4s ease',
      	},
    },
  },
  plugins: [],
}
