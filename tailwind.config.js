/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./**/*.{html,js}", 
    '!./node_modules/**/*',
    "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        mainYellow: '#D4FB71',
        subPurple: '#8CABFB',
        lightGray: '#F5F5F5',  
      },
      fontFamily:
      {
        libreBodoni_boldItalic:['LibreBodoni-BoldItalic', 'serfif'],
        libreBodoni_Regular:['LibreBodoni-Regular', 'serfif'],
        krona: ['KronaOne-Regular', 'sans-serif'], 
      },
      backgroundImage: {
        'banner': "url('./img/banner.png')",
        'main-1-bg':"url('./img/main-1-bg.png')",
        'main-2-bg':"url('./img/main-2-bg.png')",
        'main-3-bg':"url('./img/main-3-bg.png')",
        'main-5':"url('./img/main-5.png')",
        'main-6':"url('./img/main-6.png')",
        'main-7-bg':"url('./img/main-7-bg.png')",
        'main-7-btn':"url('./img/main-7-button.png')",
        'swiper-1': "url('./img/swiper-1.png')",
        'swiper-2': "url('./img/swiper-2.png')",
        'swiper-3': "url('./img/swiper-3.png')",
        'swiper-1-sm': "url('./img/swiper-1-sm.png')",
        'swiper-2-sm': "url('./img/swiper-2-sm.png')",
        'swiper-3-sm': "url('./img/swiper-3-sm.png')",
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        fadeIn: 'fadeIn 2s ease-in-out forwards',
        fadeInSlow: 'fadeInTitle 3s ease-in-out forwards',
        rotateStar: 'rotateStar 2.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1' },
        },
        fadeInSlow: {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        rotateStar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
  plugins: [
    require('flowbite/plugin'),
  ],
},
}
}