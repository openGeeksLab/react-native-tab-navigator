import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

export const isIOSX = () => {
  const { height, width } = Dimensions.get('screen');

  return (
    Platform.OS === 'ios'
    && (height === 812 || width === 812)
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: isIOSX() ? 75 : 60,
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
  },
  buttonContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
