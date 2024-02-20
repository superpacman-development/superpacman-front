import type { Config } from 'tailwindcss';

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const pxToRem1_160 = {
  ...Array.from({ length: 160 }, (_, i) => i + 1).reduce(
    (acc, px) => {
      acc[`${px}`] = pxToRem(px);
      return acc;
    },
    {} as Record<string, string>,
  ),
};

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      white: '#FFF',
      error: '#DA1E28',
      border: '#0000000F',
      lightGray: {
        '10': '#f8fafb',
        '20': '#f4f7f9',
        '30': '#ecf0f4',
        '40': '#e5e9ee',
        '50': '#dde1e8',
        '60': '#d7dce4',
        '70': '#ced4dc',
        '80': '#c3c9d0',
        '90': '#bdc3ca',
      },
      darkGray: {
        '10': '#e2e4e5',
        '20': '#c4c8cb',
        '30': '#9fa4a9',
        '40': '#7a8287',
        '50': '#60666c',
        '60': '#4c5055',
        '70': '#3f4246',
        '80': '#35373a',
        '90': '#2b2d2f',
      },
      deepNeutrals: {
        '10': '#f7f7fa',
        '20': '#ececf2',
        '30': '#d4d5e3',
        '40': '#aeb1cb',
        '50': '#8287ae',
        '60': '#626695',
        '70': '#4e517b',
        '80': '#404164',
        '90': '#373855',
      },
      shallowNeutrals: {
        '10': '#f4f7fa',
        '20': '#e6edf3',
        '30': '#d3dfeb',
        '40': '#b3c9dd',
        '50': '#8fadcb',
        '60': '#7494bd',
        '70': '#627eae',
        '80': '#566d9f',
        '90': '#4a5b83',
      },
      peaGreen: {
        '10': '#ddfbe5',
        '20': '#bdf5cd',
        '30': '#89eca6',
        '40': '#4fd977',
        '50': '#27c054',
        '60': '#1a9f41',
        '70': '#198038',
        '80': '#186330',
        '90': '#165129',
      },
      blue: {
        '10': '#e2effc',
        '20': '#bfddf8',
        '30': '#87c3f2',
        '40': '#47a3e9',
        '50': '#1f88d8',
        '60': '#116ab8',
        '70': '#0B4D89',
        '80': '#10385C',
        '90': '#0c263f',
      },
    },
    spacing: pxToRem1_160,
    borderRadius: pxToRem1_160,
    fontSize: pxToRem1_160,
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        shadow: '0px 1px 1px rgba(0, 0, 0, 0.06)',
      },
      dropShadow: {
        popover: '0px 12px 24px rgba(0, 0, 0, 0.20)',
      },
    },
  },
  plugins: [],
};

export default config;
