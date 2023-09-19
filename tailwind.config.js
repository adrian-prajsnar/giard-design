/** @type {import('tailwindcss').Config} */

export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];

export const theme = {
  screens: {
    'media-1600': { max: '1600px' },
    'media-1440': { max: '1440px' },
    'media-1200': { max: '1200px' },
    'media-1024': { max: '1024px' },
    'media-850': { max: '850px' },
    'media-750': { max: '750px' },
    'media-550': { max: '550px' },
    'media-450': { max: '450px' },
    'media-400': { max: '400px' },
    'media-360': { max: '360px' },
  },

  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    'black-lighter': '#111',
    'black-opacity': 'rgb(0,0,0,0.5)',
    'black-overlay': 'rgb(0,0,0,0.9)',
    white: '#fff',
    'white-opacity': 'rgb(255, 255, 255, 0.9)',
    'white-darker': '#F5F0EC',
    'white-darker-opacity': 'rgb(245, 240, 236, 0.9)',
    green: '#1B5B31',
    'green-lighter': '#326b46',
    'green-darker': '#18522c',
    'green-contrast': '#2E8540',
    beige: '#DCC1AB',
    'beige-transparent': '#d6b79e00',
    'beige-darker': '#9a8778',
  },

  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },

    transitionProperty: {
      'search-input': 'width, padding, border',
      'opa-trans': 'opacity, transform, background-color, visibility',
    },

    cursor: {
      magnifier: 'url(/public/assets/images/magnifier-cursor-24.png), pointer',
    },

    animation: {
      'logo-load': 'logo-load 300ms forwards 0ms  ease-in',
      'nav-links-load': 'nav-links-load 300ms forwards 300ms ease-in',
      'intro-text-load': 'intro-text-load 300ms forwards 600ms ease-out',
      'intro-slider-load': 'intro-slider-load 300ms forwards 900ms ease-out',
    },
  },
};
