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

class TabButton extends Component {
  constructor(props, context) {
    super(props, context);

    const maxOpacity = 0.12;

    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      borderScaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity),
    };
  }

  onPressedIn = (onPress) => {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 4),
    }).start(() => {
      this.state.scaleValue.setValue(0.01);
    });
    onPress();
  }

  renderRippleView() {
    const { scaleValue, opacityValue } = this.state;

    // const rippleSize = size * 2;

    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(100, 100, 100, 0.3)',
        // justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Animated.View
          style={{
            marginTop: 10,
            width: 30,
            height: 30,
            borderRadius: 15,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
            backgroundColor: 'black',
          }}
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
      <TouchableOpacity
        onPress={onButtonPress}
        style={styles.container}
      >
        <View style={styles.iconImageContianer}>
          {this.renderIconImage(buttonConfiguration)}
        </View>
        <View style={styles.titleContainer}>
          {this.renderTitleText(buttonConfiguration)}
        </View>
      </TouchableOpacity>
  )

  renderUnanimatedButton = (onButtonPress, buttonConfiguration) => (
    <View style={{ flex: 1 }}>
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
      <View style={{ margin: -40, height: 80, width: 80, flex: 0, alignItems: 'flex-start' }}>
        <View>
          {this.renderRippleView()}
          <TouchableOpacity
            onPress={() => this.onPressedIn(onPress)}
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
      </View>
    );
  }
}

export default TabButton;
