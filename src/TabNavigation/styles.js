import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: 'rgb(255, 0, 255)',
    ...Platform.select({
      ios: {
        marginBottom: 60,
      },
      android: {
        marginBottom: 60,
      },
    }),
  },
});

export default styles;
