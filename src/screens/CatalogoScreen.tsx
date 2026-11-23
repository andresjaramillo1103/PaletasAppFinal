
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://nevados-api.onrender.com';

const imagenes: { [key: number]: any } = {
  8: require('../assets/cocomaracuya.jpeg'),
  9: require('../assets/arequipequeso.jpeg'),
  10: require('../assets/fresacrema.jpeg'),
  11: require('../assets/limon3leches.jpeg'),
  12: require('../assets/maracuyalecherita.jpeg'),
  13: require('../assets/milo.jpeg'),
  14: require('../assets/ronpasas.jpeg'),
};

export default function CatalogoScreen({ navigation }: any) {
  const [sabores, setSabores] = useState<any[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: number }>({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarSabores();
  }, []);

  const cargarSabores = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/v1/sabores`);
      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success) {
        throw new Error('No se pudieron consultar los sabores');
      }

      const saboresConImagen = resultado.data.map((item: any) => ({
        ...item,
        precio: Number(item.precio),
        imagen: imagenes[item.id],
      }));

      setSabores(saboresConImagen);
    } catch (error) {
      Alert.alert(
        'Error de conexión',
        'No fue posible cargar los sabores. Verifica tu conexión a Internet e inténtalo nuevamente.'
      );
    } finally {
      setCargando(false);
    }
  };

  const incrementar = (id: number) => {
    setCantidades(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementar = (id: number) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const pedido = sabores
    .filter(item => (cantidades[item.id] || 0) > 0)
    .map(item => ({
      ...item,
      cantidad: cantidades[item.id],
    }));

  const totalUnidades = pedido.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalCompra = pedido.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const formatoPrecio = (valor: number) =>
    valor.toLocaleString('es-CO');

  const finalizarCompra = () => {
    if (pedido.length === 0) {
      Alert.alert('Atención', 'Selecciona al menos un sabor.');
      return;
    }

    navigation.navigate('ResumenPedido', { pedido });
  };

  if (cargando) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar backgroundColor="#FFF5EA" barStyle="dark-content" />
        <ActivityIndicator size="large" color="#E875A8" />
        <Text style={styles.loadingText}>
          Preparando los sabores de Nevados...
        </Text>
        <Text style={styles.loadingEmoji}>🍓 🍦 🥭</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFF5EA" barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🍓 🥭 🍫</Text>

          <Text style={styles.title}>
            ¡Elige tus favoritos!
          </Text>

          <Text style={styles.subtitle}>
            Descubre nuestros deliciosos sabores artesanales
          </Text>

          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorIcon}>✨</Text>
            <View style={styles.separatorLine} />
          </View>
        </View>

        {/* Tarjetas de sabores */}
        {sabores.map((item, index) => {
          const cantidad = cantidades[item.id] || 0;

          const colores = [
            '#FFE89A',
            '#FFD0E5',
            '#BDF5D9',
            '#C8E4FF',
          ];

          const color = colores[index % colores.length];

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                { borderColor: color },
              ]}
            >
              <View style={styles.imageContainer}>
                {item.imagen ? (
                  <Image
                    source={item.imagen}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderEmoji}>🍦</Text>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <Text style={styles.nombre}>
                  {item.nombre}
                </Text>

                <Text style={styles.precio}>
                  $ {formatoPrecio(item.precio)}
                </Text>

                <View style={styles.contador}>
                  <TouchableOpacity
                    style={[
                      styles.btnContador,
                      styles.btnRestar,
                    ]}
                    onPress={() => decrementar(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.btnText}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.cantidad}>
                    {cantidad}
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.btnContador,
                      styles.btnSumar,
                    ]}
                    onPress={() => incrementar(item.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {cantidad > 0 && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedText}>
                    ✓
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Preparado con ❤️ para ti
          </Text>
          <Text style={styles.footerEmoji}>🍍 🍉 🍦</Text>
        </View>
      </ScrollView>

      {/* Resumen inferior de compra */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryInfo}>
          <Text style={styles.summaryLabel}>
            Tu selección
          </Text>

          <Text style={styles.summaryQuantity}>
            🛍️ {totalUnidades} paleta(s)
          </Text>

          <Text style={styles.summaryTotal}>
            $ {formatoPrecio(totalCompra)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={finalizarCompra}
          style={styles.botonComprar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBoton}>
            Continuar →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EA',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#765C60',
    fontWeight: '600',
  },

  loadingEmoji: {
    fontSize: 25,
    marginTop: 12,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 145,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  headerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: '900',
    color: '#8D2852',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
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

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    borderWidth: 2,
    padding: 12,
    marginBottom: 16,
    minHeight: 145,

    shadowColor: '#754D43',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },

  imageContainer: {
    width: 112,
    height: 112,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#FFF0E8',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderEmoji: {
    fontSize: 45,
  },

  productInfo: {
    flex: 1,
    marginLeft: 13,
    justifyContent: 'center',
  },

  nombre: {
    fontSize: 16,
    fontWeight: '900',
    color: '#382B30',
  },

  precio: {
    fontSize: 15,
    fontWeight: '800',
    color: '#A83D68',
    marginTop: 6,
  },

  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },

  btnContador: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnRestar: {
    backgroundColor: '#F7B8D1',
  },

  btnSumar: {
    backgroundColor: '#6BCFA0',
  },

  btnText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 27,
  },

  cantidad: {
    minWidth: 35,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    color: '#49343B',
  },

  selectedBadge: {
    position: 'absolute',
    top: 9,
    right: 9,
    backgroundColor: '#65D6A0',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  footer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 15,
  },

  footerText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#956D70',
  },

  footerEmoji: {
    fontSize: 21,
    marginTop: 8,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#754D43',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 12,
  },

  summaryInfo: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 12,
    color: '#956D70',
    fontWeight: '600',
  },

  summaryQuantity: {
    fontSize: 14,
    color: '#49343B',
    fontWeight: '700',
    marginTop: 3,
  },

  summaryTotal: {
    fontSize: 18,
    fontWeight: '900',
    color: '#8D2852',
    marginTop: 3,
  },

  botonComprar: {
    backgroundColor: '#E875A8',
    borderRadius: 17,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 10,
    elevation: 3,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },
});
