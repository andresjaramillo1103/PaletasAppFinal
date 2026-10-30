
import { Image, ScrollView, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  quienesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logoPequeno: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  quienesTexto: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default function QuienesSomosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.quienesContainer}>
      <Image
        source={require('../assets/logonevados.jpeg')}
        style={styles.logoPequeno}
      />
      <Text style={styles.quienesTexto}>
        Somos Nevados, una marca de helados casera que nace de reuniones familiares y recetas únicas de una madre emprendedora.
        Buscamos llevar nuestros sabores y creaciones hasta tu hogar para compartir momentos inolvidables.
        {'\n\n'}
        Estamos comprometidos con el medio ambiente, por eso usamos bolsas 100% de almidón de yuca, un material biodegradable que se disuelve con agua caliente, cuidando así nuestro planeta.
      </Text>
    </ScrollView>
  );
}
