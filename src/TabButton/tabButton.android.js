import React, { Component } from 'react';
import {
  TouchableOpacity,
  Animated,
  Easing,
  Image,
  View,
  Text,
} from 'react-native';

import styles from './styles';

const animationDuration = 400;

const borderInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [7, 0],
};

const viewScaleInterpolationConfig = {
  inputRange: [0, 1],
  outputRange: [0.1, 2],
};

class TabButton extends Component {
  constructor(props, context) {
    super(props, context);

    const maxOpacity = 0.12;

    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0),
      borderScaleValue: new Animated.Value(0),
      opacityValue: new Animated.Value(maxOpacity),
    };
  }

  onPressedIn = (onPress) => {
    Animated.parallel([
      Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.bezier(0.0, 0.0, 0.1, 1),
        useNativeDriver: true,
      }),
      Animated.timing(this.state.borderScaleValue, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.state.scaleValue.setValue(0);
      this.state.borderScaleValue.setValue(0);
    });

    onPress();
  }

  renderRippleView(buttonConfig) {
    const { scaleValue, borderScaleValue } = this.state;
    const { activeTintColor } = buttonConfig;
    return (
      <View style={styles.rippleViewContainer}>
        <Animated.View
          style={[
            styles.rippleViewAnimated,
            { height: '100%', width: '100%', zIndex: 5 },
            {
              borderColor: activeTintColor,
              backgroundColor: 'red',
              borderRadius: 15,
              // borderWidth: borderScaleValue.interpolate(borderInterpolationConfig),
              transform: [{
                scale: scaleValue.interpolate(viewScaleInterpolationConfig),
              }],
            },
          ]}
        />
      </View>
    );
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

  renderAnimatedButton = (onButtonPress, buttonConfiguration) => (
    <View style={styles.buttonIOSContainer}>
      {this.renderRippleView(buttonConfiguration)}
      <TouchableOpacity
        onPress={() => this.onPressedIn(onButtonPress)}
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
    const {
      onPress,
      buttonConfiguration,
    } = this.props;

    return (
      buttonConfiguration.animated
        ? this.renderAnimatedButton(onPress, buttonConfiguration)
        : this.renderUnanimatedButton(onPress, buttonConfiguration)
    );
  }
}

export default TabButton;
