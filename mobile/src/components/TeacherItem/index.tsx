import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import api from '../../services/api';

import styles from './styles';

export interface TeachersTypes {
  id: number;
  avatar:  string;
  bio: string;
  cost: string;
  name: string;
  subject: string;
  whatsapp: number,
}

interface TeacherItemProps {
  teacher: TeachersTypes;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  // não podemos alterar uma propriedade do componente diretamente.
  // por isso que foi colocado em um estado.

  function handleLinkToWhatsapp() {
    api.post('/connections', {
      user_id: teacher.id
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }
  
  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    };
    // o favorites no primeiro momento pode ser null, por isso estamos fazendo essa condição.

      if (isFavorited) {
        // remove favorite

        // retorna a posição do teacher dentro do favoritesArray
        const favoriteIndex = favoritesArray.findIndex((teacherItem: TeachersTypes) => {
          return teacherItem.id === teacher.id;
          // verificando se o id do teacher que esta la no favoritesArray e igual ao teacher.id.
        });

        favoritesArray.splice(favoriteIndex, 1);

        setIsFavorited(false);
      } else {
        // add favorite
        
        favoritesArray.push(teacher);
        // professor que eu quero favoritar

        setIsFavorited(true);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      // agora estou salvando no banco em formato de texto.
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: (teacher.avatar) }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'  '}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {}
            ]}
          >
            { isFavorited 
              ? <Image source={unfavoriteIcon} /> 
              : <Image source={heartOutlineIcon} /> 
            }
            
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;