import React, { Component } from 'react';
import { View, Text } from 'react-native';

import BarPanel from '../BarPanel'

import styles from './styles';

class NavigatorView extends Component {
  render() {
    const {
      buttonsConfiguration,
    } = this.props;

    return (
      <View style={styles.navigationContainer}>
        <View style={styles.screenContainer} />
        <View>
          <BarPanel
            buttonsConfiguration={buttonsConfiguration}
          />
        </View>
      </View>
    );
  }
}

export default NavigatorView;
