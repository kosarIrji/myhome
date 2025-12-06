/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          vazir: ["Modam", "sans-serif"], // نام فونتی که در public/fonts گذاشتی
        },
      },
    },
    plugins: [],
  };
  