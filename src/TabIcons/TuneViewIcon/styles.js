import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    backgroundColor: 'transparent',
    paddingTop: 2,
  },
  rowContainer: {
    height: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1,
  },
  rowTrack: {
    height: 2,
    width: '100%',
    backgroundColor: 'grey',
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
