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

const iconScaleInterpolatationConfiguration = {
  inputRange: [0, 0.7, 1],
  outputRange: [1, 1.5, 1],
};

const iconrotationInterpolationConfiguration = {
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
};

const iconTranslationInterpolationConfig = {
  inputRange: [0, 0.5, 1],
  outputRange: [0, 10, -20],
};

const SPRING_CONFIG = { tension: 2, friction: 2 };

class TabButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      animationValue: new Animated.Value(0),
      rippleValue: new Animated.Value(0),
    };
    this.animations = {
      animationValue: new Animated.Value(0),
      rippleValue: new Animated.Value(0),
    };

    const n = new TabAnimations(this.props.buttonConfiguration.animation);
  }

  onPressedIn = (onPress, animationType) => {
    const animation = animationType === 'bouncing'
      ? Animated.spring
      : Animated.timing;

    Animated.parallel([
      animation(this.animations.animationValue, {
        toValue: 1,
        ...SPRING_CONFIG,
        duration: animationDuration,
        // easing: Easing.bezier(0.0, 0.0, 0.1, 1),
      }),
      Animated.timing(this.state.rippleValue, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.bezier(0.0, 0.0, 0.1, 1),
      }),
    ]).start(() => {
      this.animations.animationValue.setValue(0);
      this.state.rippleValue.setValue(0);
    });
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
    const { animationValue } = this.state;
    const { animation } = buttonConfiguration;

    let animationType = 'timing';

    const transformationConfiguration = animation.map((animationItem) => {
      const isObject = animationItem !== null && typeof animationItem === 'object';

      if (isObject) {
        animationType = animationItem.type;
      }

      const animationName = isObject
        ? animationItem.name
        : animationItem;

      switch (animationName) {
        case 'scale':
          return { scale: this.animations.animationValue.interpolate(iconScaleInterpolatationConfiguration) };
        case 'rotationX':
          return { rotateX: this.animations.animationValue.interpolate(iconrotationInterpolationConfiguration) };
        case 'rotationY':
          return { rotateY: this.animations.animationValue.interpolate(iconrotationInterpolationConfiguration) };
        case 'rotationZ':
          return { rotateZ: this.animations.animationValue.interpolate(iconrotationInterpolationConfiguration) };
        case 'fume':
          return { translateY: this.animations.animationValue.interpolate(iconTranslationInterpolationConfig) };
        default: return { translateX: 0 };
      }
    });

    return (
      <View style={styles.buttonIOSContainer}>
        {this.renderRippleView(buttonConfiguration)}
        <TouchableOpacity
          onPress={() => this.onPressedIn(onButtonPress, animationType)}
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
