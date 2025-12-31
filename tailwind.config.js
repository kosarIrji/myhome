const {heroui} = require('@heroui/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/components/spinner.js"
  ],
    theme: {
      extend: {
        fontFamily: {
          vazir: ["Modam", "sans-serif"], // نام فونتی که در public/fonts گذاشتی
        },
      },
    },
  plugins: [heroui()],
  };
  