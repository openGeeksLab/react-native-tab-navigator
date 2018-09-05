import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { height, width } = Dimensions.get('screen');

export const isIOSX = Platform.OS === 'ios'
  && (height === 812 || width === 812);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: isIOSX ? 75 : 60,
      },
      android: {
        height: 60,
      },
    }),
    backgroundColor: '#faf8fa',
    borderTopColor: '#edecef',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
