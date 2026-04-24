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
  				DEFAULT: '#7C3AED', // Vibrant Violet
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#F472B6', // Soft Pink
  				foreground: '#FFFFFF'
  			},
        accent: {
          DEFAULT: '#10B981', // Emerald
          foreground: '#FFFFFF'
        },
  			surface: '#F9FAFB',
        card: '#FFFFFF',
  			border: 'rgba(0, 0, 0, 0.05)',
  			input: 'rgba(0, 0, 0, 0.05)',
  			ring: '#7C3AED',
  		},
  		borderRadius: {
  			lg: '2rem',
  			md: '1.5rem',
  			sm: '1rem'
  		},
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(135deg, #7C3AED 0%, #F472B6 100%)',
        'soft-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'vibrant': '0 10px 25px -5px rgba(124, 58, 237, 0.3)',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}