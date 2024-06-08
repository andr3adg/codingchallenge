module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          test: './test',
          underscore: 'lodash',
        },
      },
    ],
  ],
};
