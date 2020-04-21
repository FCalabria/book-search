module.exports = {
  theme: {
    fontFamily: {
      sans: [
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', 'Times', 'serif'],
      mono: ['Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    minWidth: {
      '0': '0',
      '1/3': '33%',
      '1/2': '50%',
      'full': '100%',
    }
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'hover', 'focus', 'active']
  },
}
