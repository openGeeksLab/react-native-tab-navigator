import React, { Component } from 'react';

import TabButton from './tabButton';

class TabButtonContainer extends Component {
  render() {
    const {
      onPress,
      buttonConfiguration,
    } = this.props;

    return (
      <TabButton
        onPress={onPress}
        buttonConfiguration={buttonConfiguration}
      />
    );
  }
}

export default TabButtonContainer;
