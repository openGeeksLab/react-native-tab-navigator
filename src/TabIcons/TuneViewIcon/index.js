import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Platform } from 'react-native';

import styles from './styles';

const leftInterpolation = {
  inputRange: [0, 0.5, 1],
  outputRange: Platform.OS === 'ios' ? [0, -8, 0] : [0, 22, 0],
};

const rightInterpolation = {
  inputRange: [0, 0.5, 1],
  outputRange: Platform.OS === 'ios' ? [0, 8, 0] : [0, -22, 0],
};

class TuneViewIcon extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    activeTintColor: PropTypes.string.isRequired,
    inactiveTintColor: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.state = {
      buttonsAnimation: new Animated.Value(0),
    };
  }

  callAnimations() {
    Animated.spring(
      this.state.buttonsAnimation,
      {
        toValue: 1,
        tension: 1,
        friction: 2,
      },
    ).start(() => this.state.buttonsAnimation.setValue(0));
  }

  render() {
    const {
      active,
      activeTintColor,
      inactiveTintColor,
    } = this.props;

    const viewStyle = active
      ? { backgroundColor: activeTintColor }
      : { backgroundColor: inactiveTintColor };

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={[styles.rowTrack, viewStyle]} />
          <Animated.View
            style={[
              styles.buttonLeft,
              {
                ...viewStyle,
                transform: [{ translateX: this.state.buttonsAnimation.interpolate(rightInterpolation) }],
              },
            ]}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowTrack, viewStyle]} />
          <Animated.View
            style={[
              styles.buttonRight,
              {
                ...viewStyle,
                transform: [{ translateX: this.state.buttonsAnimation.interpolate(leftInterpolation) }],
              },
            ]}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.rowTrack, viewStyle]} />
          <Animated.View
            style={[
              styles.buttonLeft,
              {
                ...viewStyle,
                transform: [{ translateX: this.state.buttonsAnimation.interpolate(rightInterpolation) }],
              },
            ]}
          />
        </View>
      </View>
    );
  }
}
export default TuneViewIcon;
