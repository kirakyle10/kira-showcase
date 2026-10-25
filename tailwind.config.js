/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kira: {
          bg: '#0A0D14',
          surface: '#131720',
          border: '#1E2535',
          accent: '#6C63FF',
          accent2: '#00D4AA',
          warn: '#FF6B35',
          text: '#E8EAF0',
          muted: '#6B7280',
          gold: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradientShift 18s ease infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '80%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
