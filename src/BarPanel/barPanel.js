import React, { Component } from 'react';
import {
  Animated,
  Easing,
  View,
} from 'react-native';

import styles from './styles';

class BarPanel extends Component {
  renderButtons = buttonsConfiguration => (
    buttonsConfiguration.map((item, index) => {
      const { renderButton } = this.props;
      return (
        <View
          key={`key_${index}`}
          style={styles.buttonContainer}
        >
          {this.props.renderButton(item)}
        </View>
      );
    })
  );

  render() {
    const { buttonsConfiguration } = this.props;

    return (
      <View style={styles.container}>
        {this.renderButtons(buttonsConfiguration)}
      </View>
    );
  }
}

export default BarPanel;
