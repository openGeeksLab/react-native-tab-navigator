<p align="left">
  <a href="https://www.opengeekslab.com" target="_blank">
  <img src="https://github.com/openGeeksLab/react-native-tab-navigator/blob/develop/header_github-open.png" width="100%" title="openGeeksLab"/>
    </a>
 </p>

# react-native-tab-navigator

## Requirements
- React Native 0.50+
- iOS 9.0+
- Android 4.2+

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
The library provides animations fume, pendulum, rotationX, rotationY, rotationZ, opacity, scale, ripple. All animations can be combined.
```javascript
  animation: [
    'ripple',
    'scale',
  ]
```
Also, animations can be additionally set aside. If you transfer an object to the animation array that consists of the field 'name'  - the name of the animation and the type: "bouncing", the animation will have an "elastic effect" (except Ripple).
```javascript
animation: [{
  name: 'scale',
  type: 'bouncing',
}]
```

In the field of durations, you specify the animation time in milliseconds (400ms by default)
```javascript
animation: [
  {
    name: 'fume',
    duration: 700,
  },
  {
    name: 'fadeOut',
    duration: 700,
  },
]
```

The library provides built-in icons for ```Social```, ```Message```, ```TuneView```, ```Bell```, ```Lever```, ```Tune```.
They can be imported
```javascript
import { TabIcons } from 'react-native-tab-navigator';
{
      title: 'Item 5',
      tabIcon: TabIcons.Lever
}
```
You can transfer your icon
```javascript
const myIcon = require('./my-icon-file.png');
{
      title: 'Item 5',
      tabIcon: myIcon
}
```
You can send a component as an icon.
If the component implements internal animations, it must provide a ```callAnimations()``` method to call the animations.
