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
  				DEFAULT: '#A78BFA', // Soft Violet
  				dark: '#8B5CF6',
  				light: '#DDD6FE',
  				foreground: '#FFFFFF'
  			},
  			neutral: {
  				bg: '#F4F5F7',
  				card: '#FFFFFF',
  				section: '#E6E8EC',
  				border: '#D1D5DB'
  			},
  			text: {
  				heading: '#1E1E1E',
  				body: '#4B5563',
  				caption: '#9CA3AF'
  			},
  			accent: {
  				highlight: '#F472B6', // Pink highlight
  				premium: '#F97316'
  			},
  			success: '#22C55E',
  			error: '#EF4444',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  		},
  		borderRadius: {
  			lg: '2rem',
  			md: '1.5rem',
  			sm: '1rem'
  		},
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)',
        'soft-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #F4F5F7 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(167, 139, 250, 0.07)',
        'vibrant': '0 10px 25px -5px rgba(167, 139, 250, 0.3)',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}