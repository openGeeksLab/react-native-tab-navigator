import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableView: {
    flex: 0,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImageContianer: {
    width: 30,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  iconImage: {
    width: 25,
    height: 21,
  },
  titleContainer: {
    height: 22,
  },
  titleText: {
    fontSize: 10,
    lineHeight: 12,
    color: '#818692',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  rippleViewContainer: {
    ...Platform.select({
      ios: {
        height: '100%',
      },
      android: {
        height: 150,
        paddingTop: 60,
      },
    }),
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rippleViewAnimated: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonIOSContainer: {
    alignItems: 'flex-start',
  },
  buttonAndroidContainer: {
    alignItems: 'flex-start',
    marginTop: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingTop: 60,
  },
  touchableAnimatedView: {
    top: 50,
    height: 50,
    position: 'absolute',
    justifyContent: 'flex-end',
  },
});

export default styles;
