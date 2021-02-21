/* eslint-disable @typescript-eslint/no-var-requires */
const { colors, screens, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      sm: screens.sm,
      md: screens.md,
      lg: screens.lg,
    },
    colors: {
      blue: {
        DEFAULT: '#0f94b3',
        light: '#16add0',
      },
      gray: colors.coolGray,
      white: colors.white,
    },
    fontFamily: {
      ...fontFamily,
      sans: [
        'Helvetica Neue',
        'Arial',
        'Hiragino Kaku Gothic ProN',
        'Hiragino Sans',
        'Meiryo',
        'sans-serif',
      ],
    },
    backgroundImage: {},
  },
  variants: {
    outline: ['focus'],
  },
};
