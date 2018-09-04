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

const iconScaleInterpolatationConfiguration = {
  inputRange: [0, 0.7, 1],
  outputRange: [1, 1.5, 1],
};

const iconrotationInterpolationConfiguration = {
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
};

class TabButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      animationTiming: new Animated.Value(0),
    };
  }

  onPressedIn = (onPress) => {
    Animated.parallel([
      Animated.timing(this.state.animationTiming, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.bezier(0.0, 0.0, 0.1, 1),
      }),
    ]).start(() => {
      this.state.animationTiming.setValue(0);
    });
    onPress();
  }

  renderRippleView(buttonConfig) {
    const { animationTiming } = this.state;
    const { activeTintColor, animation } = buttonConfig;
    if (animation.includes('ripple')) {
      return (
        <View style={styles.rippleViewContainer}>
          <Animated.View
            style={[
              styles.rippleViewAnimated,
              {
                borderColor: activeTintColor,
                borderWidth: animationTiming.interpolate(borderInterpolationConfig),
                opacity: animationTiming.interpolate(rippleOpacityInterpolationConfig),
                transform: [{
                  scale: animationTiming.interpolate(viewScaleInterpolationConfig),
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
    const { animationTiming } = this.state;
    const { animation } = buttonConfiguration;

    const transformationConfiguration = animation.map((animationItem) => {
      switch (animationItem) {
        case 'scale':
          return { scale: animationTiming.interpolate(iconScaleInterpolatationConfiguration) };
        case 'rotationX':
          return { rotateX: animationTiming.interpolate(iconrotationInterpolationConfiguration) };
        case 'rotationY':
          return { rotateY: animationTiming.interpolate(iconrotationInterpolationConfiguration) };
        case 'rotationZ':
          return { rotateZ: animationTiming.interpolate(iconrotationInterpolationConfiguration) };
        default: return { translateX: 0 };
      }
    });

    return (
      <View style={styles.buttonIOSContainer}>
        {this.renderRippleView(buttonConfiguration)}
        <TouchableOpacity
          onPress={() => this.onPressedIn(onButtonPress)}
          style={styles.touchableView}
        >
          <Animated.View
            style={[
              styles.iconImageContianer,
              { transform: transformationConfiguration },
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
