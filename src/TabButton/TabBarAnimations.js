import { Animated } from 'react-native';

const animationDuration = 400;

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
  outputRange: [0, 15, -50],
};

// const SPRING_CONFIG = { tension: 2, friction: 2 };

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
        case 'fadeOut':
          animationInformaion.style = {
            opacity: this.animations.animatedValue.interpolate(fadeOutInterpolation),
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
      resultStyle.interpolation = interpolation;
    }
    return resultStyle;
  }

  getAnimations() {
    return this.animations;
  }
}

export default TabBarAnimations;
