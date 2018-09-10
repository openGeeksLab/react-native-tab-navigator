import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BarPanel from './barPanel';

class BarPanelContainer extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    buttonsConfiguration: PropTypes.array.isRequired,
  }

  onButtonPress = (buttonConfig) => {
    const { navigate } = this.props;
    navigate(buttonConfig.key);
  }

  renderButton = (buttonConfig, viewWidth) => {
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
    const { buttonsConfiguration } = this.props;

    return (
      <BarPanel
        buttonsConfiguration={buttonsConfiguration}
        renderButton={this.renderButton}
      />
    );
  }
}

export default BarPanelContainer;
