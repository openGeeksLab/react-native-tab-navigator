import React, { Component } from 'react';
import { View } from 'react-native';

import TabButton from '../TabButton';

import styles from './styles';

class BarPanel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TabButton />
        </View>
        <View style={styles.buttonContainer}>
          <TabButton />
        </View>
        <View style={styles.buttonContainer}>
          <TabButton />
        </View>
        <View style={styles.buttonContainer}>
          <TabButton />
        </View>
        <View style={styles.buttonContainer}>
          <TabButton />
        </View>
      </View>
    );
  }
}

export default BarPanel;
