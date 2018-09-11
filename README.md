# react-native-tab-navigator
<p align="center">
  <img src="https://github.com/openGeeksLab/react-native-tab-navigator/blob/develop/header_github-open.png" width="100%" title="hover text">
  <img src="https://github.com/openGeeksLab/react-native-tab-navigator/blob/develop/header_github-open.png" width="100%" alt="accessibility text">
</p>
## Requirements
- React Native 0.50+

## Installation
- npm install --save https://github.com/openGeeksLab/react-native-tab-navigator.git

## Basic usage
```javascript
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigation, TabButton, TabIcons } from 'react-native-tab-navigator';

import Screen1 from './screens/screen1';
import Screen2 from './screens/screen2';
import Screen3 from './screens/screen3';
import Screen4 from './screens/screen4';
import Screen5 from './screens/screen5';

const navigationRouter = {
  Screen_1: {
    screen: Screen1,
    screenOptions: {
      title: 'Item 1',
      showTitle: true,
      animated: true,
      tabIcon: TabIcons.Social,
      animation: [
        {
          name: 'rotationY',
          type: 'bouncing',
        },
      ],
    },
  },
  Screen_2: {
    screen: Screen2,
    screenOptions: {
      title: 'Item 2',
      showTitle: true,
      tabIcon: TabIcons.Message,
      animation: [
        'ripple',
        { name: 'scale' },
        {
          name: 'fume',
          duration: 700,
        },
        {
          name: 'fadeOut',
          duration: 700,
        },
      ],
    },
  },
  Screen_3: {
    screen: Screen3,
    screenOptions: {
      title: 'Item 3',
      tabIcon: TabIcons.TuneView,
      animated: true,
      animation: [],
    },
  },
  Screen_4: {
    screen: Screen4,
    screenOptions: {
      title: 'Item 4',
      tabIcon: TabIcons.Bell,
      animation: [
        {
          name: 'pendulum',
          duration: 700,
        },
      ],
    },
  },
  Screen_5: {
    screen: Screen5,
    screenOptions: {
      title: 'Item 5',
      tabIcon: TabIcons.Lever,
      animation: [
        {
          name: 'scale',
          type: 'bouncing',
        },
      ],
    },
  },
};

const defaultConfig = {
  lazy: true,
  defaultRoute: 'Screen_3',
  screenOptions: {
    showTitle: true,
    animated: true,
    buttonView: TabButton,
    activeTintColor: '#0579fc',
    inactiveTintColor: '#818692',
    animation: ['ripple', 'rotationZ'],
  },
};

const TabNavigation = TabNavigation(navigationRouter, defaultConfig);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <TabNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
```

## Animations usage
