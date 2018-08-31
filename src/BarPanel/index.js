import React, { Component } from 'react';

import BarPanel from './barPanel';

class BarPanelContainer extends Component {

  onButtonPress = (buttonConfig) => {
    const { navigate } = this.props;
    navigate()
  }

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
