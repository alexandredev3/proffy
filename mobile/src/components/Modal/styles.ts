import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 50,
    padding: 13,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#8257e5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },

  title: {
    fontSize: 16,
    fontFamily: 'Archivo_700Bold',
    color: '#FFF'
  },

  icon: {
    marginRight: 10
  }
});

export default styles;