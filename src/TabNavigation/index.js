import React from 'react';

import NavigatorView from './navigatorView';
import TabButton from '../TabButton';

// If title not specified title equal screen key by default
const defaultScreenOptions = {
  showTitle: true,
  buttonView: TabButton,
  activeTintColor: '#0579fc',
  inactiveTintColor: '#818692',

  tabIcon: null, // source of icon image
  iconStyle: null, // style of icon image
  textActiveStyle: null,
  textInactiveStyle: null,
};

const defaultNavigationConfig = {
  lazy: false,
  screenOptions: defaultScreenOptions,
};

function generateButtonsInformation(router, config) {
  const routesEntries = Object.entries(router);
  const buttonsArray = routesEntries.map((item) => {
    const screenKey = item[0];
    const screenOptions = {
      ...config.screenOptions,
      ...item[1].screenOptions,
    };

    if (!screenOptions.title) {
      screenOptions.title = screenKey;
    }

    return { ...screenOptions };
  });
  return buttonsArray;
}

function createTabNavigator(router, navConfig) {
  const navigatorRouter = router;
  const navigatorConfig = { ...defaultNavigationConfig, ...navConfig };
  const buttonsInfo = generateButtonsInformation(navigatorRouter, navigatorConfig);

  class TabNavigation extends React.Component {
    render() {
      return (
        <NavigatorView
          buttonsConfiguration={buttonsInfo}
        />
      );
    }
  }

  return TabNavigation;
}

export default createTabNavigator;
