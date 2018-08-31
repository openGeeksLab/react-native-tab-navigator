import React, { Component } from 'react';
import { View } from 'react-native';

import TabButton from '../TabButton';

import styles from './styles';

class BarPanel extends Component {
  render() {
    const {
      renderButton,
      buttonsConfiguration,
    } = this.props;
    console.log('buttonsConfiguration: ', buttonsConfiguration);
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {renderButton(buttonsConfiguration[0])}
        </View>
        <View style={styles.buttonContainer}>
          {renderButton(buttonsConfiguration[1])}
        </View>
        <View style={styles.buttonContainer}>
          {renderButton(buttonsConfiguration[2])}
        </View>
        <View style={styles.buttonContainer}>
          {renderButton(buttonsConfiguration[3])}
        </View>
        <View style={styles.buttonContainer}>
          {renderButton(buttonsConfiguration[4])}
        </View>
      </View>
    );
  }
}

export default BarPanel;
