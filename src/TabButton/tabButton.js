import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';

import styles from './styles';
import Icons from '../TabIcons';

class TabButton extends Component {
  renderIconImage = (imageSource, imageCustomStyle) => {
    if (imageSource) {
      const imageStyle = imageCustomStyle
        ? [styles.iconImage, imageCustomStyle]
        : styles.iconImage;

      return (
        <Image
          style={imageStyle}
          source={imageSource}
          resizeMode={'contain'}
        />
      );
    }
    return null;
  }

  renderTitleText = (buttonConfig) => {
    const {
      title,
      showTitle,
      activeTintColor,
      inactiveTintColor,
      textActiveStyle,
      textInactiveStyle,
    } = buttonConfig;

    if (showTitle) {
      return (
        <Text
          numberOfLines={2}
          style={styles.titleText}
        >
          {title}
        </Text>
      );
    }
    return null;
  }

  render() {
    const {
      onButtonPress,
      buttonConfiguration,
    } = this.props;
    const {
      tabIcon,
      iconStyle,
    } = buttonConfiguration;

    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconImageContianer}>
          {this.renderIconImage(tabIcon, iconStyle)}
        </View>
        <View style={styles.titleContainer}>
          {this.renderTitleText(buttonConfiguration)}
        </View>
      </TouchableOpacity>
    );
  }
}

export default TabButton;
