/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'sans-serif'],
  			copernicus: ['Merriweather', 'serif'],
  			tiempos: ['Lora', 'serif'],
  			styrene: ['Space Grotesk', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			parchment: '#F4F1EA',
  			ink: '#2B2B2B',
  			silver: '#C0C0C0',
  			muted: {
  				DEFAULT: '#8C8C8C',
  				foreground: '#8C8C8C'
  			},
  			primary: {
  				DEFAULT: '#2B2B2B',
  				foreground: '#F4F1EA'
  			},
  			border: 'rgba(43, 43, 43, 0.1)',
  			input: 'rgba(43, 43, 43, 0.1)',
  			ring: '#2B2B2B',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}