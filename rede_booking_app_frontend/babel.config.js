module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Keep plugins minimal to avoid Metro issues with web
      // react-native-reanimated must be listed first if used
      'react-native-reanimated/plugin',
    ],
  };
};
