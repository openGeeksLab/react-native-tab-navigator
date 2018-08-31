import React, { Component } from 'react';

import BarPanel from './barPanel';

class BarPanelContainer extends Component {

  renderButton = (buttonConfig) => {
    const { onButtonPress } = this.props;
    const TabButton = buttonConfig.buttonView;

    return (
      <TabButton
        onPress={() => {}}
        buttonConfiguration={buttonConfig}
      />
    );
  }

  render() {
    const {
      buttonsConfiguration,
    } = this.props;

    return (
      <BarPanel
        buttonsConfiguration={buttonsConfiguration}
        renderButton={this.renderButton}
      />
    );
  }
}

export default BarPanelContainer;
