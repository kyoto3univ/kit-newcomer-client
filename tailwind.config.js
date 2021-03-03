/* eslint-disable @typescript-eslint/no-var-requires */
const {
  colors,
  screens,
  fontFamily,
  gridTemplateColumns,
} = require('tailwindcss/defaultTheme');

const plugins = [];

try {
  plugins.push(require('@tailwindcss/forms'));
} catch (e) {}

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
      gray: colors.gray,
      white: colors.white,
      red: colors.red,
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
    gridTemplateColumns: {
      ...gridTemplateColumns,
      cards: 'repeat(auto-fit, minmax(auto, 360px))',
    },
  },
  plugins,
};
