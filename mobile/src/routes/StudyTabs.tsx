import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';
import styles from '../pages/Landing/styles';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0, // tirar a sombra
          shadowOpacity: 0, // tirar sombra do ios
          height: 64, // alterar a altura do bg da aba.    
        },

        // estilização de cada uma das abas
        tabStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },

        // estilização nos icons
        iconStyle: {
          flex: 0, // tirar a ocupação do icon da tela toda
          width: 20,
          height: 20
        },

        // estilização dos textos
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16
        },

        // cor do background quando ela não esta selecionada
        inactiveBackgroundColor: '#fafafc',

        // cor do background quando ela estiver selecionada
        activeBackgroundColor: '#ebebf5',

        // cor do texto quando ela não estiver selecionada
        inactiveTintColor: '#c1bccc',

        // cor do texto quando ela estiver selecionada
        activeTintColor: '#32264d'
      }}
    >
      <Screen 
        name="TeacherList" 
        component={TeacherList} 
        options={{
          // nome da label da tab
          tabBarLabel: 'Proffys',

          // Esse parametro vem automaticamente na função.
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons 
                name="ios-easel" 
                size={size} 
                color={focused ? '#8257e5' : color} 
              />
            );
          }
        }}
      />
      <Screen 
        name="Favorites" 
        component={Favorites} 
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ size, color, focused }) => {
            return (
              <Ionicons 
                name="ios-heart" 
                size={size} 
                color={focused ? '#8257e5' : color} 
              />
            );
          }
        }}
      />
    </Navigator>
  );
}

export default StudyTabs;