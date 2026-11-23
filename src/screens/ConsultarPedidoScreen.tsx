
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://nevados-api.onrender.com';

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
        Alert.alert(
          'Pedido no encontrado',
          'Verifica el código ingresado.'
        );
        return;
      }

      setPedido(resultado.data);
    } catch (error) {
      Alert.alert(
        'Error de conexión',
        'No fue posible consultar el pedido. Inténtalo nuevamente.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Encabezado */}
      <View style={styles.encabezado}>
        <Text style={styles.emojis}>🍓 🥭 🍦</Text>

        <Text style={styles.titulo}>
          ¿Cómo va tu Nevado?
        </Text>

        <Text style={styles.descripcion}>
          ¡Estamos felices de acompañarte!
          {'\n'}
          Consulta aquí el estado de tu pedido.
        </Text>

        <View style={styles.separador}>
          <View style={styles.linea} />
          <Text style={styles.brillo}>✨</Text>
          <View style={styles.linea} />
        </View>
      </View>

      {/* Formulario */}
      <View style={styles.formulario}>
        <Text style={styles.subtitulo}>
          🔎 Consulta tu pedido
        </Text>

        <Text style={styles.textoAyuda}>
          Ingresa el código que recibiste al registrar tu compra.
        </Text>

        <Text style={styles.etiqueta}>
          Código del pedido
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: NV-00017"
          placeholderTextColor="#A9949D"
          value={codigo}
          onChangeText={setCodigo}
          autoCapitalize="characters"
          editable={!cargando}
        />

        <TouchableOpacity
          style={[
            styles.boton,
            cargando && styles.botonDeshabilitado,
          ]}
          onPress={consultarPedido}
          disabled={cargando}
          activeOpacity={0.8}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>
              🔍 CONSULTAR PEDIDO
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Resultado */}
      {pedido && (
        <View style={styles.resultado}>
          <Text style={styles.tituloResultado}>
            🎉 ¡Encontramos tu pedido!
          </Text>

          <View style={styles.estadoBox}>
            <Text style={styles.codigoPedido}>
              NV-{String(pedido.id).padStart(5, '0')}
            </Text>

            <Text style={styles.estado}>
              Estado: {pedido.estado}
            </Text>
          </View>

          <Text style={styles.seccion}>
            👤 Datos del cliente
          </Text>

          <Text style={styles.dato}>
            Cliente: {pedido.cliente}
          </Text>

          <Text style={styles.dato}>
            Fecha: {new Date(pedido.fecha).toLocaleDateString('es-CO')}
          </Text>

          <View style={styles.divisor} />

          <Text style={styles.seccion}>
            🛍️ Productos de tu pedido
          </Text>

          {pedido.productos.map((producto: any, index: number) => (
            <View key={index} style={styles.producto}>
              <View style={styles.productoInfo}>
                <Text style={styles.nombreProducto}>
                  {producto.nombre}
                </Text>
                <Text style={styles.cantidadProducto}>
                  Cantidad: {producto.cantidad}
                </Text>
              </View>

              <Text style={styles.subtotal}>
                ${Number(producto.subtotal).toLocaleString('es-CO')}
              </Text>
            </View>
          ))}

          <View style={styles.totalBox}>
            <Text style={styles.textoTotal}>
              💚 Total de tu compra
            </Text>

            <Text style={styles.total}>
              ${Number(pedido.total).toLocaleString('es-CO')}
            </Text>
          </View>
        </View>
      )}

      {/* Pie de pantalla */}
      <View style={styles.pie}>
        <Text style={styles.textoPie}>
          Hecho con ❤️ y mucho sabor
        </Text>
        <Text style={styles.emojisPie}>
          🍍 🍉 🍦
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 35,
    backgroundColor: '#FFF4E9',
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: 25,
  },
  emojis: {
    fontSize: 35,
    marginBottom: 12,
  },
  titulo: {
    fontSize: 27,
    fontWeight: '900',
    color: '#87385F',
    textAlign: 'center',
    marginBottom: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#765D57',
    textAlign: 'center',
    lineHeight: 24,
  },
  separador: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginTop: 22,
  },
  linea: {
    flex: 1,
    height: 3,
    backgroundColor: '#F2C6D9',
  },
  brillo: {
    fontSize: 22,
    marginHorizontal: 12,
  },
  formulario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F6DFA0',
    padding: 22,
    marginBottom: 22,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  subtitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#87385F',
    marginBottom: 10,
  },
  textoAyuda: {
    fontSize: 15,
    color: '#765D57',
    lineHeight: 22,
    marginBottom: 22,
  },
  etiqueta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#59434D',
    marginBottom: 9,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#EBC5D7',
    borderRadius: 15,
    padding: 15,
    fontSize: 17,
    color: '#49333D',
    backgroundColor: '#FFF7FA',
    marginBottom: 18,
  },
  boton: {
    backgroundColor: '#E56FA8',
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#A7E8CD',
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  tituloResultado: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#87385F',
    textAlign: 'center',
    marginBottom: 18,
  },
  estadoBox: {
    backgroundColor: '#FFF0F6',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  codigoPedido: {
    fontSize: 23,
    fontWeight: '900',
    color: '#87385F',
    marginBottom: 7,
  },
  estado: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#37866B',
  },
  seccion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#87385F',
    marginBottom: 12,
  },
  dato: {
    fontSize: 16,
    color: '#59434D',
    marginBottom: 9,
  },
  divisor: {
    height: 1,
    backgroundColor: '#F2C6D9',
    marginVertical: 18,
  },
  producto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF7FA',
    borderRadius: 13,
    padding: 13,
    marginBottom: 10,
  },
  productoInfo: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#49333D',
  },
  cantidadProducto: {
    fontSize: 14,
    color: '#765D57',
    marginTop: 5,
  },
  subtotal: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#87385F',
  },
  totalBox: {
    backgroundColor: '#D7F5E8',
    borderRadius: 17,
    padding: 18,
    alignItems: 'center',
    marginTop: 15,
  },
  textoTotal: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#34765F',
  },
  total: {
    fontSize: 29,
    fontWeight: '900',
    color: '#267A59',
    marginTop: 8,
  },
  pie: {
    alignItems: 'center',
    marginTop: 10,
  },
  textoPie: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#987A78',
  },
  emojisPie: {
    fontSize: 22,
    marginTop: 8,
  },
});
