import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Platform, Dimensions } from 'react-native';

import styles from './styles';

const { width } = Dimensions.get('screen');
const buttonAnimatedViewWidth = buttonsArrayLength => width / buttonsArrayLength;

class BarPanel extends Component {
  static propTypes = {
    renderButton: PropTypes.func.isRequired,
    buttonsConfiguration: PropTypes.array.isRequired,
  }

  UNSAFE_componentWillMount() {
    Dimensions.addEventListener('change', () => {
      this.forceUpdate();
    });
  }

  renderButtons = (buttonsConfiguration) => {
    const viewWidth = buttonAnimatedViewWidth(buttonsConfiguration.length);
    let isAnimated = false;
    const buttonsArray = buttonsConfiguration.map((item, index) => {
      const { renderButton } = this.props;
      if (Platform.OS === 'android' && item.animated) {
        isAnimated = true;
        return (
          <View
            key={`key_${index}`}
            style={[
              styles.animatedButtonContainer,
              {
                left: index * viewWidth,
                width: viewWidth,
              },
            ]}
          >
            <View style={styles.fakePanelcontainer} />
            {renderButton(item, viewWidth)}
          </View>
        );
      }
      return (
        <View
          key={`key_${index}`}
          style={styles.buttonContainer}
        >
          {renderButton(item)}
        </View>
      );
    });

    if (isAnimated) {
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
