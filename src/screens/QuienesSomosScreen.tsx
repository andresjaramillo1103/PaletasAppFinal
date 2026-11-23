
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function QuienesSomosScreen() {
  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Presentación */}
      <View style={styles.encabezado}>
        <Image
          source={require('../assets/logonevados.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.emojis}>🍓 🥭 🍦</Text>

        <Text style={styles.titulo}>
          ¡Somos Nevados!
        </Text>

        <Text style={styles.subtitulo}>
          Sabores que nacen del amor y la tradición familiar
        </Text>

        <Text style={styles.decoracion}>✨ ━━━━━━━━━ ✨</Text>
      </View>

      {/* Nuestra historia */}
      <View style={[styles.tarjeta, styles.tarjetaHistoria]}>
        <Text style={styles.tituloTarjeta}>
          ❤️ Nuestra historia
        </Text>

        <Text style={styles.texto}>
          Somos Nevados, una marca de helados casera que nace de
          reuniones familiares y recetas únicas de una madre emprendedora.
          Buscamos llevar nuestros sabores y creaciones hasta tu hogar
          para compartir momentos inolvidables.
        </Text>

        <View style={styles.frase}>
          <Text style={styles.fraseTexto}>
            "Cada sabor tiene una historia y cada paleta un momento especial."
          </Text>
        </View>
      </View>

      {/* Collage de sabores */}
      <View style={styles.seccionSabores}>
        <Text style={styles.tituloSeccion}>
          🍭 Nuestros deliciosos sabores
        </Text>

        <Text style={styles.descripcionSeccion}>
          Una pequeña muestra de las delicias que tenemos para ti.
        </Text>

        <View style={styles.collage}>
          <View style={styles.filaCollage}>
            <View style={styles.tarjetaSabor}>
              <Image
                source={require('../assets/cocomaracuya.jpeg')}
                style={styles.imagenSabor}
                resizeMode="cover"
              />
              <Text style={styles.nombreSabor}>
                Coco maracuyá
              </Text>
            </View>

            <View style={styles.tarjetaSabor}>
              <Image
                source={require('../assets/arequipequeso.jpeg')}
                style={styles.imagenSabor}
                resizeMode="cover"
              />
              <Text style={styles.nombreSabor}>
                Arequipe y queso
              </Text>
            </View>
          </View>

          <View style={styles.filaCollage}>
            <View style={styles.tarjetaSabor}>
              <Image
                source={require('../assets/fresacrema.jpeg')}
                style={styles.imagenSabor}
                resizeMode="cover"
              />
              <Text style={styles.nombreSabor}>
                Fresa crema
              </Text>
            </View>

            <View style={styles.tarjetaSabor}>
              <Image
                source={require('../assets/milo.jpeg')}
                style={styles.imagenSabor}
                resizeMode="cover"
              />
              <Text style={styles.nombreSabor}>
                Milo
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Compromiso ambiental */}
      <View style={[styles.tarjeta, styles.tarjetaAmbiente]}>
        <Text style={styles.tituloTarjeta}>
          🌱 Nuestro compromiso con el planeta
        </Text>

        <Text style={styles.texto}>
          Estamos comprometidos con el medio ambiente, por eso usamos
          bolsas 100% de almidón de yuca, un material biodegradable
          que se disuelve con agua caliente, cuidando así nuestro planeta.
        </Text>

        <Text style={styles.emojisAmbiente}>
          🌎 💚 🌿
        </Text>
      </View>

      {/* Cierre */}
      <View style={styles.pie}>
        <Text style={styles.pieTitulo}>
          Nevados, hechos con amor ❤️
        </Text>

        <Text style={styles.pieTexto}>
          Gracias por permitirnos ser parte de tus momentos especiales.
        </Text>

        <Text style={styles.pieEmojis}>
          🍍 🍉 🍓 🍦
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#FFF4E9',
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  encabezado: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 175,
    height: 175,
    marginBottom: 5,
  },

  emojis: {
    fontSize: 30,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 29,
    fontWeight: '900',
    color: '#87385F',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 15,
    color: '#765D57',
    textAlign: 'center',
    marginTop: 9,
    lineHeight: 23,
  },

  decoracion: {
    fontSize: 17,
    color: '#E8A9C5',
    marginTop: 18,
  },

  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 20,
    marginBottom: 22,
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  tarjetaHistoria: {
    borderColor: '#F4C3D7',
  },

  tituloTarjeta: {
    fontSize: 20,
    fontWeight: '900',
    color: '#87385F',
    marginBottom: 14,
  },

  texto: {
    fontSize: 15,
    lineHeight: 25,
    color: '#59464C',
    textAlign: 'left',
  },

  frase: {
    backgroundColor: '#FFF0F6',
    padding: 15,
    borderRadius: 15,
    marginTop: 18,
  },

  fraseTexto: {
    color: '#963D68',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },

  seccionSabores: {
    marginBottom: 22,
  },

  tituloSeccion: {
    fontSize: 22,
    fontWeight: '900',
    color: '#87385F',
    textAlign: 'center',
  },

  descripcionSeccion: {
    fontSize: 14,
    color: '#765D57',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  collage: {
    gap: 13,
  },

  filaCollage: {
    flexDirection: 'row',
    gap: 13,
  },

  tarjetaSabor: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 9,
    borderWidth: 2,
    borderColor: '#F5D4A2',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  imagenSabor: {
    width: '100%',
    height: 145,
    borderRadius: 13,
  },

  nombreSabor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#87385F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },

  tarjetaAmbiente: {
    backgroundColor: '#F0FAF1',
    borderColor: '#A8DDB6',
  },

  emojisAmbiente: {
    fontSize: 27,
    textAlign: 'center',
    marginTop: 17,
  },

  pie: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  pieTitulo: {
    fontSize: 19,
    fontWeight: '900',
    color: '#87385F',
    textAlign: 'center',
  },

  pieTexto: {
    fontSize: 14,
    color: '#765D57',
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 9,
  },

  pieEmojis: {
    fontSize: 25,
    marginTop: 12,
  },
});
