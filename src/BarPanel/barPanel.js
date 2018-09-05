import React, { Component } from 'react';
import { View, Platform, Dimensions } from 'react-native';

import styles from './styles';

const { width } = Dimensions.get('screen');
const buttonAnimatedViewWidth = buttonsArrayLength => width / buttonsArrayLength;

class BarPanel extends Component {
  renderButtons = (buttonsConfiguration) => {
    let viewWidth = buttonAnimatedViewWidth(buttonsConfiguration.length);
    let isAnimated = false;
    const buttonsArray = buttonsConfiguration.map((item, index) => {
      const { renderButton } = this.props;
      if (Platform.OS === 'android' && item.animated) {
        isAnimated = true;
        return (
          <View
            key={`key_${index}`}
            style={{
              position: 'absolute',
              bottom: 0,
              left: index * viewWidth,
              height: 100,
              width: viewWidth,
              // backgroundColor: 'rgba(0, 0, 0, 0.3)',
              // borderLeftWidth: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {this.props.renderButton(item, viewWidth)}
          </View>
        );
      }
      return (
        <View
          key={`key_${index}`}
          style={styles.buttonContainer}
        >
          {this.props.renderButton(item)}
        </View>
      );
    });

    if (isAnimated) {
      // console.warn('animated')
      return (buttonsArray);
    }

    return (
      <View style={styles.container}>
        {buttonsArray}
      </View>
    );
  }

  render() {
    const { buttonsConfiguration } = this.props;
    return this.renderButtons(buttonsConfiguration);
  }
}

export default BarPanel;
