import React from 'react';

import NavigatorView from './navigatorView';
import TabButton from '../TabButton';

// If title not specified title equal screen key by default
const defaultScreenOptions = {
  showTitle: true,
  animated: true,
  buttonView: TabButton,
  activeTintColor: '#0579fc',
  inactiveTintColor: '#818692',

  tabIcon: null, // source of icon image
  iconStyle: null, // style of icon image
  textStyle: null,
  textActiveStyle: null,
  textInactiveStyle: null,
};

const defaultNavigationConfig = {
  lazy: false,
  screenOptions: defaultScreenOptions,
};

function generateStateInitInformation(router, config) {
  const routesEntries = Object.entries(router);
  const buttonsArray = routesEntries.map((item) => {
    const screenKey = item[0];
    const screenOptions = {
      ...config.screenOptions,
      ...item[1].screenOptions,
      active: false,
      key: screenKey,
    };

    if (config.defaultRoute === screenKey) {
      screenOptions.active = true;
    }

    if (!screenOptions.title) {
      screenOptions.title = screenKey;
    }

    return { ...screenOptions };
  });
  return buttonsArray;
}

function navigateToScreen(screenName, currentState) {
  const nextState = currentState.map((item) => {
    const nextItem = {
      ...item,
      active: item.key === screenName,
    };
    return nextItem;
  });
  return nextState;
}

function createTabNavigator(router, navConfig) {
  const navigatorRouter = router;
  const navigatorConfig = { ...defaultNavigationConfig, ...navConfig };
  const routeState = generateStateInitInformation(navigatorRouter, navigatorConfig);

  class TabNavigation extends React.Component {
    constructor() {
      super();
      this.routeState = routeState;
    }

    navigateTo = (screenName) => {
      this.routeState = navigateToScreen(screenName, this.routeState);
      this.forceUpdate();
    }

    render() {
      return (
        <NavigatorView
          navigate={this.navigateTo}
          buttonsConfiguration={this.routeState}
        />
      );
    }
  }

  return TabNavigation;
}

export default createTabNavigator;
