import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TabButton from './tabButton';

class TabButtonContainer extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    viewWidth: PropTypes.oneOfType([PropTypes.number, undefined]),
    buttonConfiguration: PropTypes.object.isRequired,
  }

  render() {
    const {
      onPress,
      viewWidth,
      buttonConfiguration,
    } = this.props;

    return (
      <TabButton
        onPress={onPress}
        viewWidth={viewWidth}
        buttonConfiguration={buttonConfiguration}
      />
    );
  }
}

export default TabButtonContainer;
