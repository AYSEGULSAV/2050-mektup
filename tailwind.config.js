/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js}', // HTML ve JS dosyalarındaki Tailwind sınıflarını hedef al
  ],
  theme: {
    extend: {
      fontFamily: {
      shadows: ['Shadows Into Light', 'cursive'],
    },
  },
  },
  plugins: [],
}
