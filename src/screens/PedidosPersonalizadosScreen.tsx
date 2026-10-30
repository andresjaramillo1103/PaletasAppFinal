
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function PedidosPersonalizadosScreen() {
  const whatsappUrl = 'https://wa.me/573128166460';

  return (
    <ScrollView contentContainerStyle={styles.pedidosContainer}>
      <Image
        source={require('../assets/personalizados.jpeg')}
        style={styles.imagenPedidos}
      />

      <Text style={styles.pedidosTexto}>
        En Nevados sabemos que no siempre podemos apegarnos a un catálogo,
        por eso escuchamos a nuestros clientes con pedidos personalizados,
        cajas decoradas, mensajes de amor y de agradecimiento.
        {'\n\n'}
        Y como cereza del pastel, en fechas especiales lanzamos productos
        acorde a la festividad.
      </Text>

      <TouchableOpacity
        style={styles.botonWhatsapp}
        onPress={() => Linking.openURL(whatsappUrl)}
      >
        <Text style={styles.textoBoton}>
          Enviar mensaje por WhatsApp
        </Text>
      </TouchableOpacity>

      <Text style={styles.contactoTexto}>
        Contáctanos también en:{'\n'}
        Correo: andmaujar@gmail.com{'\n'}
        Teléfono: +57 3128166460
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pedidosContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#a5dc89',
    flexGrow: 1,
  },
  imagenPedidos: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  pedidosTexto: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 25,
    color: '#333333',
  },
  botonWhatsapp: {
    backgroundColor: '#25D366',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactoTexto: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: '#333333',
  },
});
