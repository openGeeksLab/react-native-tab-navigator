import TabNavigation from './tabNavigation';
import TabButton from '../TabButton';

const defaultScreenOptions = {
  showTitle: true,
  buttonView: TabButton,
  activeTintColor: '#0579fc',
  inactiveTintColor: '#818692',
};

const defaultNavigationConfig = {
  lazy: false,
  defaultScreenOptions,
};

function createTabNavigator(router, navConfig) {
  const navigatorRouter = router;
  const navigatorConfig = { ...defaultNavigationConfig, navConfig };

  return TabNavigation;
}

export default createTabNavigator;
