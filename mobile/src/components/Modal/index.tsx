import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'; 

import styles from './styles';

interface ModalProps {
  title: string;
}

const Modal: React.FC<ModalProps> = ({ title }) => {

  const fadeIn = useRef(new Animated.Value(0)).current;

  function loadAnimation() {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    loadAnimation();
  }, [])

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Feather style={styles.icon} name="alert-triangle" color="#FFF" size={30} />
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
}

export default Modal;