
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PedidosPersonalizadosScreen() {
  const whatsappUrl = 'https://wa.me/573128166460';

  const abrirWhatsApp = async () => {
    try {
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      Alert.alert(
        'No se pudo abrir WhatsApp',
        'Intenta nuevamente o comunícate con nosotros por teléfono.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎁 🍓 🍦</Text>

        <Text style={styles.titulo}>
          ¡Creamos algo especial para ti!
        </Text>

        <Text style={styles.subtitulo}>
          Tu imaginación, nuestro delicioso sabor
        </Text>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorIcon}>✨</Text>
          <View style={styles.separatorLine} />
        </View>
      </View>

      {/* Imagen principal */}
      <View style={styles.imagenCard}>
        <Image
          source={require('../assets/personalizados.jpeg')}
          style={styles.imagenPedidos}
          resizeMode="contain"
        />
      </View>

      {/* Descripción */}
      <View style={styles.descripcionCard}>
        <View style={styles.descripcionHeader}>
          <Text style={styles.iconoSeccion}>💝</Text>
          <Text style={styles.tituloSeccion}>
            Pedidos a tu gusto
          </Text>
        </View>

        <Text style={styles.pedidosTexto}>
          En Nevados sabemos que no siempre podemos apegarnos a un catálogo,
          por eso escuchamos a nuestros clientes con pedidos personalizados,
          cajas decoradas, mensajes de amor y de agradecimiento.
          {'\n\n'}
          Y como cereza del pastel, en fechas especiales lanzamos productos
          acorde a la festividad.
        </Text>

        <View style={styles.etiquetas}>
          <View style={styles.etiqueta}>
            <Text style={styles.etiquetaTexto}>🎀 Cajas decoradas</Text>
          </View>

          <View style={styles.etiqueta}>
            <Text style={styles.etiquetaTexto}>💌 Mensajes especiales</Text>
          </View>

          <View style={styles.etiqueta}>
            <Text style={styles.etiquetaTexto}>🎉 Fechas especiales</Text>
          </View>
        </View>
      </View>

      {/* Contacto por WhatsApp */}
      <View style={styles.contactoCard}>
        <Text style={styles.contactoEmoji}>💬</Text>

        <Text style={styles.contactoTitulo}>
          ¡Hablemos de tu idea!
        </Text>

        <Text style={styles.contactoDescripcion}>
          Escríbenos y juntos haremos realidad tu pedido especial.
        </Text>

        <TouchableOpacity
          style={styles.botonWhatsapp}
          onPress={abrirWhatsApp}
          activeOpacity={0.8}
        >
          <Text style={styles.iconoWhatsapp}>✆</Text>
          <Text style={styles.textoBoton}>
            Enviar mensaje por WhatsApp
          </Text>
        </TouchableOpacity>
      </View>

      {/* Información de contacto */}
      <View style={styles.datosCard}>
        <Text style={styles.datosTitulo}>
          📍 También puedes encontrarnos
        </Text>

        <View style={styles.datoFila}>
          <Text style={styles.datoIcono}>✉️</Text>
          <Text style={styles.datoTexto}>
            andmaujar@gmail.com
          </Text>
        </View>

        <View style={styles.datoFila}>
          <Text style={styles.datoIcono}>📱</Text>
          <Text style={styles.datoTexto}>
            +57 312 816 6460
          </Text>
        </View>
      </View>

      {/* Pie de pantalla */}
      <View style={styles.footer}>
        <Text style={styles.footerTexto}>
          Hecho con ❤️ y mucho sabor
        </Text>
        <Text style={styles.footerEmoji}>🍍 🍉 🍦</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EA',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 35,
  },

  header: {
    alignItems: 'center',
    marginBottom: 20,
  },

  headerEmoji: {
    fontSize: 31,
    marginBottom: 10,
  },

  titulo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#8D2852',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#765C60',
    textAlign: 'center',
    marginTop: 8,
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginTop: 18,
  },

  separatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F3C7D3',
  },

  separatorIcon: {
    marginHorizontal: 12,
    fontSize: 18,
  },

  imagenCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 12,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#FFE2A1',

    shadowColor: '#754D43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 4,
  },

  imagenPedidos: {
    width: '100%',
    height: 230,
  },

  descripcionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 20,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#F7C5DC',

    shadowColor: '#754D43',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  descripcionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  iconoSeccion: {
    fontSize: 25,
    marginRight: 10,
  },

  tituloSeccion: {
    fontSize: 19,
    fontWeight: '900',
    color: '#8D2852',
  },

  pedidosTexto: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'left',
    color: '#554449',
  },

  etiquetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },

  etiqueta: {
    backgroundColor: '#FFF0F6',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },

  etiquetaTexto: {
    fontSize: 12,
    fontWeight: '700',
    color: '#963D68',
  },

  contactoCard: {
    backgroundColor: '#D5F5E5',
    borderRadius: 23,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#8DDBB5',
  },

  contactoEmoji: {
    fontSize: 35,
    marginBottom: 8,
  },

  contactoTitulo: {
    fontSize: 21,
    fontWeight: '900',
    color: '#286B50',
    textAlign: 'center',
  },

  contactoDescripcion: {
    fontSize: 14,
    lineHeight: 21,
    color: '#45695A',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 18,
  },

  botonWhatsapp: {
    backgroundColor: '#25D366',
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    elevation: 3,
  },

  iconoWhatsapp: {
    fontSize: 21,
    color: '#FFFFFF',
    marginRight: 9,
    fontWeight: 'bold',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },

  datosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: '#C8E4FF',
  },

  datosTitulo: {
    fontSize: 16,
    fontWeight: '900',
    color: '#365B80',
    marginBottom: 15,
  },

  datoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  datoIcono: {
    fontSize: 19,
    marginRight: 12,
  },

  datoTexto: {
    fontSize: 14,
    color: '#554449',
    fontWeight: '600',
    flexShrink: 1,
  },

  footer: {
    alignItems: 'center',
    marginTop: 22,
  },

  footerTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: '#956D70',
  },

  footerEmoji: {
    fontSize: 21,
    marginTop: 8,
  },
});
