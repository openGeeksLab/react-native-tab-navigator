import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Animated,
  Platform,
  Easing,
  Image,
  View,
  Text,
} from 'react-native';

import styles from './styles';

import TabAnimations from './TabBarAnimations';

const animationDuration = 400;

const borderInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [20, 0],
};

const rippleOpacityInterpolationConfig = {
  inputRange: [0, 0.1, 1],
  outputRange: [0, 0.3, 0.7],
};

const viewScaleInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [0.1, 2],
};

class TabButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    viewWidth: PropTypes.number,
    buttonConfiguration: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    const { animation } = this.props.buttonConfiguration;

    this.state = { rippleValue: new Animated.Value(0) };

    this.animationObject = new TabAnimations(animation);
    this.animationStyle = this.animationObject.getAnimatedStyle();
  }

  onPressedIn = (onPress) => {
    this.animationObject.callAnimations();
    Animated.timing(this.state.rippleValue, {
      toValue: 1,
      duration: animationDuration,
      easing: Easing.bezier(0.0, 0.0, 0.1, 1),
    }).start(() => {
      this.state.rippleValue.setValue(0);
    });
    /* eslint-disable react/no-string-refs */
    if (this.refs.image_ref) {
      this.refs.image_ref.callAnimations();
    }
    onPress();
  }

  renderRippleView(buttonConfig) {
    const { rippleValue } = this.state;
    const { activeTintColor, animation } = buttonConfig;
    if (animation.includes('ripple')) {
      return (
        <View style={styles.rippleViewContainer}>
          <Animated.View
            style={[
              styles.rippleViewAnimated,
              {
                borderColor: activeTintColor,
                borderWidth: rippleValue.interpolate(borderInterpolationConfig),
                opacity: rippleValue.interpolate(rippleOpacityInterpolationConfig),
                transform: [{
                  scale: rippleValue.interpolate(viewScaleInterpolationConfig),
                }],
              },
            ]}
          />
        </View>
      );
    }
    return null;
  }

  renderIconImage = (buttonConfiguration) => {
    const {
      active,
      tabIcon,
      iconStyle,
      activeTintColor,
      inactiveTintColor,
    } = buttonConfiguration;

    if (tabIcon) {
      if (typeof tabIcon === 'function') {
        return React.createElement(tabIcon, { ...buttonConfiguration, ref: 'image_ref' });
      }
      const imageStyle = iconStyle
        ? [styles.iconImage, iconStyle]
        : [styles.iconImage];
      if (active) {
        imageStyle.push({ tintColor: activeTintColor });
      } else {
        imageStyle.push({ tintColor: inactiveTintColor });
      }

      return (
        <Image
          style={imageStyle}
          source={tabIcon}
          resizeMode={'contain'}
        />
      );
    }
    return null;
  }

  renderTitleText = (buttonConfig) => {
    const {
      title,
      active,
      showTitle,
      activeTintColor,
      inactiveTintColor,
      textStyle,
      textActiveStyle,
      textInactiveStyle,
    } = buttonConfig;

    const titleTextStyle = textStyle
      ? [styles.titleText, textStyle]
      : [styles.titleText];

    if (active) {
      if (textActiveStyle) {
        titleTextStyle.push(textActiveStyle);
      }
      if (activeTintColor) {
        titleTextStyle.push({ color: activeTintColor });
      }
    } else {
      if (textInactiveStyle) {
        titleTextStyle.push(textInactiveStyle);
      }
      if (inactiveTintColor) {
        titleTextStyle.push({ color: inactiveTintColor });
      }
    }

    if (showTitle) {
      return (
        <Text
          numberOfLines={2}
          style={titleTextStyle}
        >
          {title}
        </Text>
      );
    }
    return null;
  }

  renderAnimatedButton = (onButtonPress, buttonConfiguration) => {
    const { viewWidth } = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.buttonIOSContainer}>
          {this.renderRippleView(buttonConfiguration)}
          <TouchableOpacity
            onPress={() => this.onPressedIn(onButtonPress, null)}
            style={styles.touchableView}
          >
            <Animated.View
              style={[
                styles.iconImageContianer,
                this.animationStyle,
              ]}
            >
              {this.renderIconImage(buttonConfiguration)}
            </Animated.View>
            <View style={styles.titleContainer}>
              {this.renderTitleText(buttonConfiguration)}
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.buttonAndroidContainer}>
        {this.renderRippleView(buttonConfiguration)}
        <Animated.View
          style={[
            styles.iconImageContianer,
            {
              top: 50,
              position: 'absolute',
              left: (viewWidth - 30) / 2,
              ...this.animationStyle,
            },
          ]}
        >
          {this.renderIconImage(buttonConfiguration)}
        </Animated.View>
        <TouchableOpacity
          onPress={() => this.onPressedIn(onButtonPress)}
          style={[
            styles.touchableView,
            styles.touchableAnimatedView,
            {
              width: viewWidth / 1.2,
              left: (viewWidth - (viewWidth / 1.2)) / 2,
            },
          ]}
        >
          <View style={styles.titleContainer}>
            {this.renderTitleText(buttonConfiguration)}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderUnanimatedButton = (onButtonPress, buttonConfiguration) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onButtonPress}
        style={styles.touchableView}
      >
        <View style={styles.iconImageContianer}>
          {this.renderIconImage(buttonConfiguration)}
        </View>
        <View style={styles.titleContainer}>
          {this.renderTitleText(buttonConfiguration)}
        </View>
      </TouchableOpacity>
    </View>
  )

  render() {
    const { buttonConfiguration, onPress } = this.props;
    return (
      buttonConfiguration.animated
        ? this.renderAnimatedButton(onPress, buttonConfiguration)
        : this.renderUnanimatedButton(onPress, buttonConfiguration)
    );
  }
}

export default TabButton;
