import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, Alert } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeachersTypes } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  // eu so vou executar essa função, quando o usuario dar um submit no filtro.
  function loadFavorites() {
    AsyncStorage.getItem('favorites').then((response) =>{
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritesTeachersIds = favoritedTeachers.map((teacher: TeachersTypes) => {
          return teacher.id;
          // estou percorrendo os teachers salvos no banco, e retornando apenas o id.
        });

        // aqui eu so salvo o id do teacher, que esta favoritado, dessa maneira fica mais facil.
        setFavorites(favoritesTeachersIds);
      }
    });
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
    // ele sempre vai colocar o valor contrario do isFilteresVisible.
  }

  function handleFiltersSubmit() {
    // console.log({
    //   subject,
    //   week_day,
    //   time
    // });

    loadFavorites();

    api.get('/classes', {
      params: {
        subject: subject.trim(),
        week_day: week_day.trim(),
        time: time.trim()
      }
    }).then((response) => {
      const data = response.data;

      setTeachers(data);
    
      if (data.length == 0) {
        return Alert.alert('Aviso', 'Nenhum professor foi encontrado :(')
      }

      setIsFiltersVisible(false);
    }).catch((error) => {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro ao filtrar os proffys, por favor tente novamente...')
    })
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={28} color="#FFF" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              placeholder="Qual a matéria"
              placeholderTextColor='#c1bccc'
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor='#c1bccc'
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor='#c1bccc'
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >

        {teachers.map((teacher: TeachersTypes) => {
            return (
              <TeacherItem 
                key={teacher.id}
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;