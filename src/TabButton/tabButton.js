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
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconImageContianer}>
          <Image
            style={styles.iconImage}
            source={Icons.Message}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Item
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TabButton;
