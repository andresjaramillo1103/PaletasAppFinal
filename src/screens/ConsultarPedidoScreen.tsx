
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const API_URL = 'http://10.196.113.202:3000';

export default function ConsultarPedidoScreen() {
  const [codigo, setCodigo] = useState('');
  const [pedido, setPedido] = useState<any>(null);
  const [cargando, setCargando] = useState(false);

  const consultarPedido = async () => {
    const codigoLimpio = codigo.trim().toUpperCase();

    if (!/^NV-\d+$/.test(codigoLimpio)) {
      Alert.alert(
        'Código inválido',
        'Ingresa un código válido. Ejemplo: NV-00017'
      );
      return;
    }

    const idPedido = Number(codigoLimpio.replace('NV-', ''));

    try {
      setCargando(true);
      setPedido(null);

      const respuesta = await fetch(
        `${API_URL}/api/v1/pedidos/${idPedido}`
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success) {
        Alert.alert('Pedido no encontrado', 'Verifica el código ingresado.');
        return;
      }

      setPedido(resultado.data);
    } catch (error) {
      Alert.alert(
        'Error de conexión',
        'No fue posible consultar el pedido. Verifica que la API esté encendida.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consultar mi pedido</Text>

      <Text style={styles.description}>
        Ingresa el código que recibiste al registrar tu pedido.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ejemplo: NV-00017"
        value={codigo}
        onChangeText={setCodigo}
        autoCapitalize="characters"
      />

      <Button
        title="Consultar pedido"
        onPress={consultarPedido}
        disabled={cargando}
      />

      {cargando && (
        <ActivityIndicator size="large" style={styles.loading} />
      )}

      {pedido && (
        <View style={styles.card}>
          <Text style={styles.subtitle}>
            Pedido NV-{String(pedido.id).padStart(5, '0')}
          </Text>

          <Text style={styles.text}>
            Cliente: {pedido.cliente}
          </Text>

          <Text style={styles.text}>
            Estado: {pedido.estado}
          </Text>

          <Text style={styles.text}>
            Fecha: {new Date(pedido.fecha).toLocaleDateString()}
          </Text>

          <Text style={styles.subtitle}>Productos</Text>

          {pedido.productos.map((producto: any, index: number) => (
            <Text key={index} style={styles.text}>
              {producto.nombre} x {producto.cantidad} — $
              {Number(producto.subtotal).toLocaleString('es-CO')}
            </Text>
          ))}

          <Text style={styles.total}>
            Total: ${Number(pedido.total).toLocaleString('es-CO')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFDF7',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#6B4226',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D6B98C',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  loading: {
    marginTop: 20,
  },
  card: {
    marginTop: 25,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8D8BD',
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6B4226',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  total: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#38734A',
  },
});
