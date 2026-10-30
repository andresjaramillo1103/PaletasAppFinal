
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const API_URL = 'http://192.168.20.96:3000';

export default function ResumenPedidoScreen({ route, navigation }: any) {
  const { pedido } = route.params;

  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);

  const total = pedido.reduce(
    (sum: number, item: any) => sum + Number(item.precio) * item.cantidad,
    0
  );

  const mensaje =
    pedido
      .map(
        (item: any) =>
          `${item.nombre} x${item.cantidad} = $${(
            item.precio * item.cantidad
          ).toLocaleString('es-CO')}`
      )
      .join('\n') + `\nTotal: $${total.toLocaleString('es-CO')}`;

  const whatsappUrl = `https://wa.me/573128166460?text=${encodeURIComponent(
    `Cliente: ${cliente}\nTeléfono: ${telefono}\n\n${mensaje}`
  )}`;

  const finalizarPedido = async () => {
    if (!cliente.trim() || !telefono.trim()) {
      Alert.alert('Datos incompletos', 'Ingresa tu nombre y teléfono.');
      return;
    }

    if (enviando) return;

    setEnviando(true);

    try {
      const respuesta = await fetch(`${API_URL}/api/v1/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: cliente.trim(),
          telefono: telefono.trim(),
          productos: pedido.map((item: any) => ({
            sabor_id: Number(item.id),
            cantidad: Number(item.cantidad),
          })),
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success) {
        throw new Error(resultado.message || 'No se pudo guardar el pedido.');
      }

      Alert.alert(
        '¡Pedido registrado!',
        'Tu pedido quedó guardado correctamente. Ahora puedes enviarlo por WhatsApp.',
        [
          {
            text: 'Continuar',
            onPress: () => {
              Linking.openURL(whatsappUrl).catch(() => {
                Alert.alert(
                  'Pedido guardado',
                  'El pedido se guardó, pero no fue posible abrir WhatsApp.'
                );
              });
            },
          },
        ]
      );
    } catch (error: any) {
      Alert.alert(
        'Error al registrar',
        error.message || 'No fue posible conectar con el servidor.'
      );
    } finally {
      setEnviando(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.catalogoItem}>
      <Text style={styles.text}>
        {item.nombre} x{item.cantidad}
      </Text>
      <Text style={styles.text}>
        $ {(item.precio * item.cantidad).toLocaleString('es-CO')}
      </Text>
    </View>
  );

  return (
    <View style={styles.containerResumen}>
      <Text style={styles.titulo}>Datos del cliente</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        value={cliente}
        onChangeText={setCliente}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <Text style={styles.titulo}>Resumen del pedido</Text>

      <FlatList
        data={pedido}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={renderItem}
      />

      <Text style={styles.total}>
        Total: $ {total.toLocaleString('es-CO')}
      </Text>

      <View style={styles.botones}>
        {enviando ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title="Finalizar pedido"
            onPress={finalizarPedido}
          />
        )}

        <Button
          title="Volver al catálogo"
          onPress={() => navigation.goBack()}
          disabled={enviando}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerResumen: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#efaaaa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  catalogoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#efaaaa',
  },
  text: {
    fontSize: 16,
  },
  total: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 35,
    gap: 10,
  },
});
