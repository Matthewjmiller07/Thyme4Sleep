/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        brandCream: '#F3EAE3',
        brandPeach: '#F1D4AE',
        brandTaupe: '#B29F8F',
        brandMink: '#897E77',
        brandChar: '#3F3B38',
        brandSage: '#8F958C',
        brandMint: '#BCC8B9',
        
        // Semantic color assignments
        accent: '#F1D4AE', // brandPeach as primary accent
        
        // Utility colors (using brand colors)
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Green for success states (using brandSage)
        green: {
          100: '#F0F4EE',
          200: '#D9E0D8',
          300: '#BCC8B9', // brandMint
          400: '#8F958C', // brandSage
          500: '#6B7280',
          600: '#4B5563',
        },
      },
      fontFamily: {
        logo: ['"Arima Koshi"', 'cursive'],
        body: ['"Cormorant Garamond"', 'serif'], // Light variant of Cormorant Garamond
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

