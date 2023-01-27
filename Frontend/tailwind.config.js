module.exports = {
  mode: 'jit', //aot, jit
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        FFXIV: ['FFXIV', 'serif']
      }
    }
  },
  plugins: []
};
