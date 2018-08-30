import React, { Component } from 'react';
import { View, Text } from 'react-native';

import BarPanel from '../BarPanel';

import styles from './styles';

class TabNavigation extends Component {
  render() {
    return (
      <View style={styles.navigationContainer}>
        <View style={styles.screenContainer} >
          <Text>Test</Text>
        </View>
        <View>
          <BarPanel />
        </View>
      </View>
    );
  }
}

export default TabNavigation;
