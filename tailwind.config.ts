import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.dot': {
          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            width: '15px',
            height: '15px',
            backgroundColor: 'blue',
            animationName: 'dotHover',
            animationDuration: '900ms',
            animationTimingFunction: 'cubic-bezier(0.82, 0, 0.26, 1)',
            animationIterationCount: 'infinite',
            animationDelay: '100ms',
            background: 'white',
            borderRadius: '100%',
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            zIndex: '-1',
            background: 'black',
            boxShadow: '0px 0px 1px black',
            opacity: '0.2',
            width: '100%',
            height: '3px',
            left: 0,
            bottom: '-2px',
            borderRadius: '100%',
            animationName: 'dotShadow',
            animationDuration: '900ms',
            animationTimingFunction: 'cubic-bezier(0.82, 0, 0.26, 1)',
            animationIterationCount: 'infinite',
            animationDelay: '100ms',
          },
        },
        '.before\\:dot-animate': {
          '@keyframes dotHover': {
            '0%': {
              top: '0px',
            },
            '50%': {
              top: '-50px',
              transform: 'scale(1.1)',
            },
            '100%': {
              top: '0',
            },
          },
        },
        '.after\\:dot-shadow': {
          '@keyframes dotShadow': {
            '0%': {
              transform: 'scaleX(1)',
            },
            '50%': {
              opacity: '0',
              transform: 'scaleX(0.6)',
            },
            '100%': {
              transform: 'scaleX(1)',
            },
          },
        },
      };

      addUtilities(newUtilities, ['before', 'after']);
    },
  ],
  daisyui: {
    themes: ['winter', 'night'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    lightTheme: 'winter',
    darkTheme: 'night', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
export default config;
