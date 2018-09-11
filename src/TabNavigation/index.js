import React from 'react';

import NavigatorView from './navigatorView';
import TabButton from '../TabButton';

const defaultScreenOptions = {
  showTitle: true,
  animated: true,
  buttonView: TabButton,
  activeTintColor: '#0579fc',
  inactiveTintColor: '#818692',

  tabIcon: null,
  iconStyle: null,
  textStyle: null,
  textActiveStyle: null,
  textInactiveStyle: null,

  animation: [],
};

const defaultNavigationConfig = {
  lazy: false,
  screenOptions: defaultScreenOptions,
};

const screensState = {
  state: { name: '' },
  screens: { },
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
  let nextScreenName = screenName;
  const nextState = currentState.map((item) => {
    const isCurrentScreen = item.key === screenName;
    const nextItem = {
      ...item,
      active: isCurrentScreen,
    };
    if (isCurrentScreen) {
      nextScreenName = item.key;
    }
    return nextItem;
  });
  return {
    state: nextState,
    screenName: nextScreenName,
  };
}

function createTabNavigator(router, navConfig) {
  const navigatorRouter = router;
  const navigatorConfig = {
    ...defaultNavigationConfig,
    ...navConfig,
    screenOptions: {
      ...defaultNavigationConfig.screenOptions,
      ...navConfig.screenOptions,
    },
  };
  screensState.state.name = navigatorConfig.defaultRoute;
  const routesEntries = Object.entries(router);
  routesEntries.forEach((item) => {
    screensState.screens[item[0]] = React.createElement(item[1].screen);
  });
  // screensState.screens =
  // if (navigatorConfig.lazy) {
  //   console.log('lazy');
  //   const routesEntries = Object.entries(router);
  //   routesEntries.map((item) => {
  //     return item;
  //   });
  // } else {
  // }

  const routeState = generateStateInitInformation(navigatorRouter, navigatorConfig);

  class TabNavigation extends React.Component {
    constructor() {
      super();
      this.routeState = routeState;
    }

    navigateTo = (navToScreen) => {
      const { state, screenName } = navigateToScreen(navToScreen, this.routeState);
      this.routeState = state;
      screensState.state.name = screenName;
      this.forceUpdate();
    }

    getScreenFromRoute = () => {

    }

    render() {
      return (
        <NavigatorView
          screen={screensState.screens[screensState.state.name]}
          navigate={this.navigateTo}
          buttonsConfiguration={this.routeState}
        />
      );
    }
  }

  return TabNavigation;
}

export default createTabNavigator;
