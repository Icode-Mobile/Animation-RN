import React, { useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';

import Header from '../components/header';
import ModalView from '../components/modalView';

import ImageY from '../images/Yosemite.jpg';

const { width, height } = Dimensions.get('window');

export default function Details() {
  const imageOpacity = useSharedValue(0);
  const modalPosition = useSharedValue(height + 400);

  const imageStyle = useAnimatedStyle(() => {
    return {
      opacity: imageOpacity.value,
    };
  });

  const modalStyle = useAnimatedStyle(() => {
    return {
      height: modalPosition.value,
    };
  });

  useEffect(() => {
    imageOpacity.value = withTiming(1, { duration: 1000 }, () => {
      modalPosition.value = withTiming(height - 400, {
        duration: 1000,
        easing: Easing.bounce,
      });
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <StatusBar hidden />
        <Animated.View style={[imageStyle, modalStyle]}>
          <ImageBackground
            source={ImageY}
            style={{
              width: '100%',
              height: height - 400,
            }}
          >
            <Header />
          </ImageBackground>
        </Animated.View>

        <ModalView />
      </View>
    </GestureHandlerRootView>
  );
}
