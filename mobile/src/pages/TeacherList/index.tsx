import React, { useState, useCallback } from 'react';
import { 
  View, 
  ScrollView,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView, 
  Platform, 
} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeachersTypes } from '../../components/TeacherItem';
import Modal from '../../components/Modal';

import styles from './styles';

import api from '../../services/api';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('')

  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState<number>(0);
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
    //  console.log({
    //   subject,
    //   week_day,
    //   time
    // });

    loadFavorites();

    api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    }).then((response) => {
      const data = response.data;

      setTeachers(data);
    
      if (data.length == 0) {
        setModalMessage('Nenhum professor foi encontrado!')
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000);
      } else {
        setIsFiltersVisible(false);
      }
    }).catch((error) => {
      Alert.alert('Erro Inesperado', 'Ocorreu um erro ao filtrar os proffys, por favor tente novamente...')
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container}>
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
            <View style={styles.select}>
              <Picker
                selectedValue={subject}
                onValueChange={itemValue => setSubject(String(itemValue))}
              >

                <Picker.Item color="#c1bccc" value="" label="Selecione uma materia" />

                <Picker.Item value="Matemática" label="Matemática" />
                <Picker.Item value="Português" label="Português" />
                <Picker.Item value="Inglês" label="Inglês" />
                <Picker.Item value="Biologia" label="Biologia" />
                <Picker.Item value="Ciência" label="Ciência" />
                <Picker.Item value="Geografia" label="Geografia" />
                <Picker.Item value="Quimica" label="Quimica" />
                <Picker.Item value="Artes" label="Artes" />
                <Picker.Item value="Educação física" label="Educação física" />
                <Picker.Item value="Historia" label="Historia" />
                <Picker.Item value="Fisica" label="Fisica" />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={week_day}
                    onValueChange={itemValue => setWeekDay(Number(itemValue))}
                  >

                    <Picker.Item color="#c1bccc" value='' label="Dia" />

                    <Picker.Item value={0} label="Domingo" />
                    <Picker.Item value={1} label="Segunda-feira" />
                    <Picker.Item value={2} label="Terça-feira" />
                    <Picker.Item value={3} label="Quarta-feira" />
                    <Picker.Item value={4} label="Quinta-feira" />
                    <Picker.Item value={5} label="Sexta-feira" />
                    <Picker.Item value={6} label="Sábado" />
                  </Picker>
                </View>
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

      {isModalVisible && (
        <Modal title={modalMessage} />
      )}
    </KeyboardAvoidingView>
  );
}

export default TeacherList;