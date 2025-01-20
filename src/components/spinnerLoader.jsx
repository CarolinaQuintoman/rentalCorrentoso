import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const SpinnerLoader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, spinStyle]}>
        <View style={styles.innerLoaderBefore} />
        <View style={styles.innerLoaderAfter} />
      </Animated.View>
    </View>
  );
};

export default SpinnerLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    width: 20,
    height: 80,
    backgroundColor: '#935936',
    position: 'relative',
  },
  innerLoaderBefore: {
    position: 'absolute',
    top: 10,
    left: -22,
    width: 25,
    height: 60,
    backgroundColor: 'rgba(83, 112, 123, 1)',
    borderRadius: 100,
    transform: [{ rotate: '-26deg' }],
  },
  innerLoaderAfter: {
    position: 'absolute',
    width: 6,
    height: 12,
    left: -6,
    bottom: 15,
    borderRadius: 100,
    backgroundColor: '#53707b',
  },
});
