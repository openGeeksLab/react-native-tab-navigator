import React, { Component } from 'react';

import BarPanel from './barPanel';

class BarPanelContainer extends Component {
  onButtonPress = (buttonConfig) => {
    const { navigate } = this.props;
    if(buttonConfig.__debugOnPress) {
      buttonConfig.__debugOnPress();
    }
    navigate(buttonConfig.key);
  }

  renderButton = (buttonConfig, viewWidth) => {
    const { onButtonPress } = this.props;
    const TabButton = buttonConfig.buttonView;

    return (
      <TabButton
        viewWidth={viewWidth}
        onPress={() => this.onButtonPress(buttonConfig)}
        buttonConfiguration={buttonConfig}
      />
    );
  }

  render() {
    const {
      navigate,
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
