
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const styles = {
  background: {
    flex: 1,
    justifyContent: 'center' as const,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  button: {
    width: '85%' as const,
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center' as const,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold' as const,
    color: '#333333',
  },
};

export default function HomeScreen({ navigation }: any) {
  const buttonColors = ['#FDE68A', '#F9A8D4', '#A7F3D0', '#BFDBFE'];

  return (
    <ImageBackground
      source={require('../assets/logonevados.jpeg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColors[0] }]}
          onPress={() => navigation.navigate('QuienesSomos')}
        >
          <Text style={styles.buttonText}>Quiénes somos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColors[1] }]}
          onPress={() => navigation.navigate('Catalogo')}
        >
          <Text style={styles.buttonText}>Catálogo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColors[2] }]}
          onPress={() => navigation.navigate('PedidosPersonalizados')}
        >
          <Text style={styles.buttonText}>Pedidos personalizados</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={[styles.button, { backgroundColor: buttonColors[3] }]}
  onPress={() => navigation.navigate('ConsultarPedido')}
>
  <Text style={styles.buttonText}>Consultar mi pedido</Text>
</TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
