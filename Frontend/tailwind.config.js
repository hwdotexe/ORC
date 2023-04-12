module.exports = {
  mode: 'jit', //aot, jit
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        critBlue: {
          100: '#6abaf7',
          200: '#39A0ED',
          300: '#328dd3',
          400: '#2972aa'
        }
      }
    }
  },
  plugins: []
};
