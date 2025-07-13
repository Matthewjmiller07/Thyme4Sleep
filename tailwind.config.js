/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        accent: '#F1D4AE', // brand-peach used as primary accent
        brandCream: '#F3EAE3',
        brandPeach: '#F1D4AE',
        brandTaupe: '#B29F8F',
        brandMink:  '#897E77',
        brandChar:  '#3F3B38',
        brandSage:  '#8F958C',
        brandMint:  '#BCC8B9',
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

