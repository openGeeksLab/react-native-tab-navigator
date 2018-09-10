import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 26,
    paddingTop: 3,
    backgroundColor: 'transparent',
  },
  rowContainer: {
    height: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
    paddingHorizontal: 1,
    backgroundColor: 'transparent',
  },
  rowTrack: {
    height: 2,
    width: '90%',
    backgroundColor: 'grey',
    borderRadius: 1,
  },
  buttonLeft: {
    height: 4,
    width: 4,
    position: 'absolute',
    left: 4,
    top: 0,
    backgroundColor: 'grey',
    borderRadius: 1,
  },
  buttonRight: {
    height: 4,
    width: 4,
    position: 'absolute',
    right: 4,
    top: 0,
    backgroundColor: 'grey',
    borderRadius: 1,
  },
});

export default styles;
