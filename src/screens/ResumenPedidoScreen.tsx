
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://nevados-api.onrender.com';

export default function ResumenPedidoScreen({ route, navigation }: any) {
  const { pedido } = route.params;

  const [cliente, setCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [enviando, setEnviando] = useState(false);

  const total = pedido.reduce(
    (sum: number, item: any) =>
      sum + Number(item.precio) * item.cantidad,
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

  return (
    <ScrollView
      style={styles.fondo}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      {/* Presentación */}
      <View style={styles.presentacion}>
        <Text style={styles.emojis}>🧁 🍓 🥭</Text>
        <Text style={styles.tituloPrincipal}>¡Ya casi está listo!</Text>
        <Text style={styles.subtitulo}>
          Completa tus datos y disfruta tus Nevados favoritos
        </Text>
        <Text style={styles.separador}>✨ ━━━━━━━━━ ✨</Text>
      </View>

      {/* Datos del cliente */}
      <View style={[styles.tarjeta, styles.tarjetaAmarilla]}>
        <Text style={styles.tituloTarjeta}>👤 Datos del cliente</Text>
        <Text style={styles.descripcion}>
          Cuéntanos quién disfrutará este pedido
        </Text>

        <Text style={styles.etiqueta}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          placeholderTextColor="#A18C91"
          value={cliente}
          onChangeText={setCliente}
        />

        <Text style={styles.etiqueta}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu teléfono"
          placeholderTextColor="#A18C91"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />
      </View>

      {/* Resumen del pedido */}
      <View style={[styles.tarjeta, styles.tarjetaRosada]}>
        <Text style={styles.tituloTarjeta}>🛍️ Tu pedido</Text>
        <Text style={styles.descripcion}>
          Estos son los sabores que seleccionaste
        </Text>

        {pedido.map((item: any) => (
          <View key={String(item.id)} style={styles.producto}>
            {item.imagen ? (
              <Image source={item.imagen} style={styles.imagenProducto} />
            ) : (
              <View style={styles.imagenAlternativa}>
                <Text style={styles.emojiProducto}>🍦</Text>
              </View>
            )}

            <View style={styles.detalleProducto}>
              <Text style={styles.nombreProducto}>{item.nombre}</Text>
              <Text style={styles.cantidadProducto}>
                Cantidad: {item.cantidad}
              </Text>
              <Text style={styles.precioUnitario}>
                Unidad: ${Number(item.precio).toLocaleString('es-CO')}
              </Text>
            </View>

            <Text style={styles.subtotalProducto}>
              ${(Number(item.precio) * item.cantidad).toLocaleString('es-CO')}
            </Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <View style={styles.tarjetaTotal}>
        <Text style={styles.textoTotalPequeno}>💗 Total de tu compra</Text>
        <Text style={styles.textoTotal}>
          ${total.toLocaleString('es-CO')}
        </Text>
        <Text style={styles.notaTotal}>
          ¡Gracias por elegir Nevados!
        </Text>
      </View>

      {/* Botones */}
      <TouchableOpacity
        style={[styles.botonFinalizar, enviando && styles.botonDeshabilitado]}
        onPress={finalizarPedido}
        disabled={enviando}
        activeOpacity={0.85}
      >
        {enviando ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.textoBoton}>
            💚 Confirmar y finalizar pedido
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botonVolver}
        onPress={() => navigation.goBack()}
        disabled={enviando}
      >
        <Text style={styles.textoVolver}>← Volver al catálogo</Text>
      </TouchableOpacity>

      <Text style={styles.pie}>Hecho con ❤️ y mucho sabor</Text>
      <Text style={styles.pieEmojis}>🍍 🍉 🍦</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#FFF4E9',
  },
  contenido: {
    padding: 20,
    paddingBottom: 35,
  },
  presentacion: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  emojis: {
    fontSize: 34,
    marginBottom: 10,
  },
  tituloPrincipal: {
    fontSize: 27,
    fontWeight: '900',
    color: '#8C315C',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 15,
    color: '#735E62',
    textAlign: 'center',
    marginTop: 8,
  },
  separador: {
    color: '#E9AFCB',
    fontSize: 17,
    marginTop: 18,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    elevation: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  tarjetaAmarilla: {
    borderColor: '#F8DE91',
  },
  tarjetaRosada: {
    borderColor: '#F4B7D5',
  },
  tituloTarjeta: {
    fontSize: 21,
    fontWeight: '900',
    color: '#87365E',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: '#78666A',
    marginBottom: 18,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5C454D',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#FFF7FA',
    borderWidth: 1.5,
    borderColor: '#EFC5D9',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: '#42343A',
    marginBottom: 16,
  },
  producto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8FA',
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
  },
  imagenProducto: {
    width: 65,
    height: 65,
    borderRadius: 12,
  },
  imagenAlternativa: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#FCE6EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiProducto: {
    fontSize: 30,
  },
  detalleProducto: {
    flex: 1,
    marginLeft: 12,
  },
  nombreProducto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#47343C',
  },
  cantidadProducto: {
    fontSize: 13,
    color: '#725D64',
    marginTop: 4,
  },
  precioUnitario: {
    fontSize: 12,
    color: '#8C6875',
    marginTop: 3,
  },
  subtotalProducto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A43D70',
  },
  tarjetaTotal: {
    backgroundColor: '#D5F5E6',
    borderColor: '#83D7B1',
    borderWidth: 2,
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoTotalPequeno: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#286C52',
  },
  textoTotal: {
    fontSize: 32,
    fontWeight: '900',
    color: '#187A55',
    marginVertical: 8,
  },
  notaTotal: {
    fontSize: 14,
    color: '#427A64',
  },
  botonFinalizar: {
    backgroundColor: '#25C978',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  botonDeshabilitado: {
    opacity: 0.65,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
  },
  botonVolver: {
    backgroundColor: '#F9D9E9',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    marginTop: 13,
  },
  textoVolver: {
    color: '#87365E',
    fontSize: 15,
    fontWeight: 'bold',
  },
  pie: {
    textAlign: 'center',
    color: '#98777E',
    fontWeight: 'bold',
    marginTop: 25,
  },
  pieEmojis: {
    textAlign: 'center',
    fontSize: 22,
    marginTop: 8,
  },
});
