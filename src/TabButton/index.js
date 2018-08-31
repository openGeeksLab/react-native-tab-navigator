import React, { Component } from 'react';

import TabButton from './tabButton';

class TabButtonContainer extends Component {
  render() {
    const {
      onButtonPress,
      buttonConfiguration,
    } = this.props;

    return (
      <TabButton
        onButtonPress={onButtonPress}
        buttonConfiguration={buttonConfiguration}
      />
    );
  }
}

export default TabButtonContainer;
