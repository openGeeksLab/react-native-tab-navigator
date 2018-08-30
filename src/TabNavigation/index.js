import TabNavigation from './tabNavigation';
import TabButton from '../TabButton';

// If title not specified title equal screen key by default
const defaultScreenOptions = {
  showTitle: true,
  buttonView: TabButton,
  activeTintColor: '#0579fc',
  inactiveTintColor: '#818692',
};

const defaultNavigationConfig = {
  lazy: false,
  screenOptions: defaultScreenOptions,
};

function generateButtonsInformation(router, config) {
  const routesEntries = Object.entries(router);
  const buttonsArray = [];

  for (let i = 0; i < routesEntries.length; i++) {
    const screenKey = routesEntries[i][0];
    const screenOptions = {
      ...config.screenOptions,
      ...routesEntries[i][1].screenOptions,
    };

    if (!screenOptions.title) {
      screenOptions.title = screenKey;
    }

    const tmpButton = {
      ...screenOptions,
    };

    buttonsArray.push(tmpButton);
  }

  console.log(buttonsArray);
  return buttonsArray;
}

function createTabNavigator(router, navConfig) {
  const navigatorRouter = router;
  const navigatorConfig = { ...defaultNavigationConfig, ...navConfig };

  const buttonsInfo = generateButtonsInformation(navigatorRouter, navigatorConfig);

  return TabNavigation;
}

export default createTabNavigator;
