import React, { Component } from 'react';

import TabButton from './tabButton';

class TabButtonContainer extends Component {
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
