import React, { useState, useCallback } from 'react'
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeachersTypes } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    // aqui eu vou salvar todos os dados do usuario favoritado.
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {favorites.map((teacher: TeachersTypes) => {
          return (
            <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              favorited
              // como eu estou listando os teachers favoritados,
                // vou colocar o favorited com true.
            />
          );
        })}

      </ScrollView>
    </View>
  );
}

export default Favorites;