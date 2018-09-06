import { Animated } from 'react-native';

const animationDuration = 400;

const borderWidthInterpolation = {
  inputRange: [0, 1],
  outputRange: [20, 0],
};

const opacityInterpolation = {
  inputRange: [0, 0.1, 1],
  outputRange: [0, 0.3, 0.7],
};

const scaleInterpolatation = {
  inputRange: [0, 0.7, 1],
  outputRange: [1, 1.5, 1],
};

const rotationInterpolation = {
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
};

const translationInterpolation = {
  inputRange: [0, 0.5, 1],
  outputRange: [0, 10, -20],
};

// const SPRING_CONFIG = { tension: 2, friction: 2 };

class TabBarAnimations {
  constructor(animationsArray) {
    this.animatedStyle = {};
    this.animations = {
      animatedValue: new Animated.Value(0),
    };

    let animationType = 'timing';

    this.animations = animationsArray.map((animationItem) => {
      const isObject = animationItem !== null && typeof animationItem === 'object';
      if (isObject) {
        animationType = animationItem.type === 'bouncing' ? animationItem.type : 'timing';
      }
      const animationName = isObject ? animationItem.name : animationItem;

      const animationInformaion = {
        type: animationType,
      };

      switch (animationName) {
        case 'scale':
          animationInformaion.interpolation = {
            scale: this.animations.animatedValue.interpolate(scaleInterpolatation),
          };
          break;
        case 'rotationX':
          animationInformaion.interpolation = {
            rotateX: this.animations.animatedValue.interpolate(rotationInterpolation),
          };
          break;
        case 'rotationY':
          animationInformaion.interpolation = {
            rotateY: this.animations.animatedValue.interpolate(rotationInterpolation),
          };
          break;
        case 'rotationZ':
          animationInformaion.interpolation = {
            rotateZ: this.animations.animatedValue.interpolate(rotationInterpolation),
          };
          break;
        case 'fume':
          animationInformaion.interpolation = {
            translateY: this.animations.animatedValue.interpolate(translationInterpolation),
          };
          break;

        default:
          animationInformaion.interpolation = { translateX: 0 };
          break;
      }
      return animationInformaion;
    });
    console.log('this.animations: ', this.animations);
  }

  getAnimatedStyle() {
    return this.animatedStyle;
  }

  getAnimations() {
    return this.animations;
  }
}

export default TabBarAnimations;
