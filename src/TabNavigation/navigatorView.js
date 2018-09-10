import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import BarPanel from '../BarPanel';

import styles from './styles';

class NavigatorView extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    buttonsConfiguration: PropTypes.array.isRequired,
  }

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
