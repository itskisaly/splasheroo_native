module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: ['react-native-reanimated/plugin', 'tailwindcss-react-native/babel', 'react-native-paper/babel'],
  };
};