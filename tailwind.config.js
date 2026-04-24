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
  			primary: {
  				DEFAULT: '#1E3A8A', // Navy
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#3B82F6', // Blue
  				foreground: '#FFFFFF'
  			},
        accent: {
          DEFAULT: '#059669', // Deeper Emerald
          foreground: '#FFFFFF'
        },
  			surface: '#F8FAFC',
        card: '#FFFFFF',
  			border: 'rgba(0, 0, 0, 0.08)',
  			input: 'rgba(0, 0, 0, 0.08)',
  			ring: '#1E3A8A',
  		},
  		borderRadius: {
  			lg: '2rem',
  			md: '1.5rem',
  			sm: '1rem'
  		},
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        'soft-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'vibrant': '0 10px 25px -5px rgba(30, 58, 138, 0.2)',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}