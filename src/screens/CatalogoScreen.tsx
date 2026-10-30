
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const API_URL = 'http://10.196.113.202:3000';

const imagenes: { [key: number]: any } = {
  8: require('../assets/cocomaracuya.jpeg'),
  9: require('../assets/arequipequeso.jpeg'),
  10: require('../assets/fresacrema.jpeg'),
  11: require('../assets/limon3leches.jpeg'),
  12: require('../assets/maracuyalecherita.jpeg'),
  13: require('../assets/milo.jpeg'),
  14: require('../assets/ronpasas.jpeg'),
};

const { width: screenWidth } = Dimensions.get('window');

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
        imagen: imagenes[item.id]
      }));

      setSabores(saboresConImagen);
    } catch (error) {
      Alert.alert(
        'Error de conexión',
        'No fue posible cargar los sabores. Verifica que la API esté funcionando y que el celular esté conectado a la misma red Wi-Fi.'
      );
    } finally {
      setCargando(false);
    }
  };

  const incrementar = (id: number) => {
    setCantidades(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const decrementar = (id: number) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0)
    }));
  };

  const pedido = sabores
    .filter(item => (cantidades[item.id] || 0) > 0)
    .map(item => ({
      ...item,
      cantidad: cantidades[item.id]
    }));

  const finalizarCompra = () => {
    if (pedido.length === 0) {
      Alert.alert('Atención', 'Selecciona al menos un sabor.');
      return;
    }

    navigation.navigate('ResumenPedido', { pedido });
  };

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={{ marginTop: 12 }}>Cargando sabores de Nevados...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingVertical: 30 }}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        {sabores.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={item.imagen} style={styles.image} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>
              Precio: $ {item.precio.toLocaleString('es-CO')}
            </Text>

            <View style={styles.contador}>
              <TouchableOpacity
                style={styles.btnContador}
                onPress={() => decrementar(item.id)}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.cantidad}>
                {cantidades[item.id] || 0}
              </Text>

              <TouchableOpacity
                style={styles.btnContador}
                onPress={() => incrementar(item.id)}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={finalizarCompra}
        style={styles.botonFlotante}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBoton}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerScroll: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: screenWidth * 0.85,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  precio: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
  },
  contador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  btnContador: {
    backgroundColor: '#f59e0b',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
  },
  cantidad: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#f59e0b',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  textoBoton: {
    color: '#ecdddd',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
