/** @type {import('tailwindcss').Config} */

export const content = ['index.html'];

export const theme = {
  screens: {
    1600: { max: '1600px' },
    '1450px': { max: '1450px' },
    '1350px': { max: '1350px' },
    '1200px': { max: '1200px' },
    '1030px': { max: '1030px' },
    '900px': { max: '900px' },
    '750px': { max: '750px' },
    '550px': { max: '550px' },
    '450px': { max: '450px' },
    '350px': { max: '350px' },
  },
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    'black-lighter': '#111',
    'black-opacity': 'rgb(0,0,0,0.5)',
    white: '#fff',
    'white-opacity': 'rgb(255, 255, 255, 0.9)',
    'white-darker': '#F5F0EC',
    green: '#1B5B31',
    'green-lighter': '#326b46',
    // #2E8540
    'green-darker': '#18522c',
    beige: '#DCC1AB',
    'beige-darker': '#9a8778',
  },
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    transitionProperty: {
      width: 'width, padding',
    },
  },
};
