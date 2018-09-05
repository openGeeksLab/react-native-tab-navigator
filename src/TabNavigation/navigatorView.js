import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import BarPanel from '../BarPanel'

import styles from './styles';

class NavigatorView extends Component {
  render() {
    const {
      navigate,
      buttonsConfiguration,
    } = this.props;

    return (
      <View style={styles.navigationContainer}>
        <View style={styles.screenContainer} />
        <BarPanel
          navigate={navigate}
          buttonsConfiguration={buttonsConfiguration}
        />
      </View>
    );
  }
}

export default NavigatorView;
