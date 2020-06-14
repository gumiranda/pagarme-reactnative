import {Dimensions} from 'react-native';

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;
const xScreen = Dimensions.get('screen').width;
const yScreen = Dimensions.get('screen').height;

const appMetrics = {
  DEVICE_WIDTH: x,
  SCREEN_WIDTH: xScreen,
  DEVICE_HEIGTH: y,
  SCREEN_HEIGHT: yScreen,
};

export default appMetrics;
