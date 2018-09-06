import { Animated } from 'react-native';

const borderWidthInterpolation = {
  inputRange: [0, 1],
  outputRange: [20, 0],
};

const fadeOutInterpolation = {
  inputRange: [0, 1],
  outputRange: [1, 0],
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
  inputRange: [0, 0.3, 1],
  outputRange: [0, 15, -90],
};

const SPRING_CONFIG = { tension: 2, friction: 2 };

class TabBarAnimations {
  constructor(animationsArray) {
    this.animatedStyle = {};
    this.animations = {
      animatedValue: new Animated.Value(0),
    };



    this.animations = animationsArray.map((animationItem) => {
      const isObject = animationItem !== null && typeof animationItem === 'object';
      let animationType = 'timing';
      let animationDuration = 400;

      if (isObject) {
        animationType = animationItem.type === 'bouncing' ? animationItem.type : 'timing';
        animationDuration = !Number.isNaN(animationItem.duration) ? animationItem.duration : 400;
      }
      const animationName = isObject ? animationItem.name : animationItem;

      const animationInformaion = {
        type: animationType,
        duration: animationDuration,
        animation: new Animated.Value(0),
      };

      switch (animationName) {
        case 'scale':
          animationInformaion.interpolation = {
            scale: animationInformaion.animation.interpolate(scaleInterpolatation),
          };
          break;
        case 'rotationX':
          animationInformaion.interpolation = {
            rotateX: animationInformaion.animation.interpolate(rotationInterpolation),
          };
          break;
        case 'rotationY':
          animationInformaion.interpolation = {
            rotateY: animationInformaion.animation.interpolate(rotationInterpolation),
          };
          break;
        case 'rotationZ':
          animationInformaion.interpolation = {
            rotateZ: animationInformaion.animation.interpolate(rotationInterpolation),
          };
          break;
        case 'fume':
          animationInformaion.interpolation = {
            translateY: animationInformaion.animation.interpolate(translationInterpolation),
          };
          break;
        case 'fadeOut':
          animationInformaion.style = {
            opacity: animationInformaion.animation.interpolate(fadeOutInterpolation),
          };
          break;
        default:
          animationInformaion.interpolation = { translateX: 0 };
          break;
      }
      return animationInformaion;
    });
  }

  getAnimatedStyle() {
    let resultStyle = {};
    const interpolation = [];
    for (let i = 0; i < this.animations.length; i++) {
      const animation = this.animations[i];
      if (animation.interpolation) {
        interpolation.push(animation.interpolation);
      } else {
        resultStyle = {
          ...resultStyle,
          ...animation.style,
        };
      }
      resultStyle.transform = interpolation;
    }
    return resultStyle;
  }

  getAnimations() {
    return this.animations.map((item) => {
      if (item.type === 'bouncing') {
        return Animated.spring(
          item.animation,
          {
            toValue: 1,
            ...SPRING_CONFIG,
          },
        );
      }
      return Animated.timing(
        item.animation,
        {
          toValue: 1,
          duration: item.duration,
        },
      );
    });
  }

  resetAnimations() {
    return this.animations.map((item) => {
      item.animation.setValue(0);
      return item;
    });
  }

  callAnimations() {
    Animated.parallel([
      ...this.getAnimations(),
    ]).start(() => {
      this.resetAnimations();
    });
  }
}

export default TabBarAnimations;
