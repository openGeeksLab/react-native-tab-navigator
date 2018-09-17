import { StyleSheet, Platform, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

export const isIOSX = Platform.OS === 'ios'
  && (height === 812 || width === 812);

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    ...Platform.select({
      ios: {
        marginBottom: isIOSX ? 75 : 60,
      },
      android: {
        marginBottom: 60,
      },
    }),
  },
});

export default styles;
