

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const menuOptions = [
  {
    title: 'Quiénes somos',
    subtitle: 'Conoce nuestra historia',
    icon: '🏪',
    color: '#FFE89A',
    border: '#F5C84C',
    iconBackground: '#FFF3C5',
    route: 'QuienesSomos',
  },
  {
    title: 'Catálogo',
    subtitle: 'Descubre nuestros sabores',
    icon: '🍓',
    color: '#FFD0E5',
    border: '#F58BB9',
    iconBackground: '#FFE4F0',
    route: 'Catalogo',
  },
  {
    title: 'Pedidos personalizados',
    subtitle: 'Crea tu pedido a tu gusto',
    icon: '🍦',
    color: '#BDF5D9',
    border: '#65D6A0',
    iconBackground: '#D9FFEB',
    route: 'PedidosPersonalizados',
  },
  {
    title: 'Consultar mi pedido',
    subtitle: 'Revisa el estado de tu pedido',
    icon: '🛍️',
    color: '#C8E4FF',
    border: '#82BDF5',
    iconBackground: '#E1F1FF',
    route: 'ConsultarPedido',
  },
];

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFF5EA"
        barStyle="dark-content"
      />

      {/* Decoraciones del fondo */}
      <View style={styles.decorationTop} />
      <View style={styles.decorationLeft} />
      <View style={styles.decorationRight} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🍧 🍓 🥭</Text>

          <Text style={styles.welcome}>
            ¡Bienvenido a Nevados!
          </Text>

          <Text style={styles.description}>
            Un mundo de sabores para disfrutar
          </Text>

          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorEmoji}>✨</Text>
            <View style={styles.separatorLine} />
          </View>
        </View>

        {/* Menú principal */}
        <View style={styles.menu}>
          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.route}
              activeOpacity={0.75}
              style={[
                styles.card,
                {
                  backgroundColor: item.color,
                  borderColor: item.border,
                },
              ]}
              onPress={() => navigation.navigate(item.route)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.iconBackground },
                ]}
              >
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>
                  {item.title}
                </Text>

                <Text style={styles.cardSubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              <View
                style={[
                  styles.arrowContainer,
                  { backgroundColor: item.border },
                ]}
              >
                <Text style={styles.arrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pie de pantalla */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hecho con ❤️ y mucho sabor
          </Text>

          <Text style={styles.footerEmoji}>
            🍍 🍉 🍦
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EA',
    overflow: 'hidden',
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  decorationTop: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 115,
    backgroundColor: '#FFD4E5',
    top: -140,
    right: -70,
  },

  decorationLeft: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#D4F5D8',
    bottom: 100,
    left: -85,
  },

  decorationRight: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE7A3',
    bottom: 250,
    right: -65,
  },

  header: {
    alignItems: 'center',
    marginBottom: 28,
  },

  headerEmoji: {
    fontSize: 37,
    marginBottom: 10,
  },

  welcome: {
    fontSize: 25,
    fontWeight: '900',
    color: '#8D2852',
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: '#765C60',
    marginTop: 8,
    textAlign: 'center',
  },

  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '75%',
  },

  separatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#F3C7D3',
  },

  separatorEmoji: {
    marginHorizontal: 12,
    fontSize: 18,
  },

  menu: {
    width: '100%',
    gap: 16,
  },

  card: {
    minHeight: 105,
    borderRadius: 24,
    borderWidth: 2,
    paddingHorizontal: 13,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#754D43',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 35,
  },

  cardText: {
    flex: 1,
    marginLeft: 13,
    marginRight: 5,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#382B30',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#66545A',
    marginTop: 5,
  },

  arrowContainer: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 32,
  },

  footer: {
    alignItems: 'center',
    marginTop: 28,
  },

  footerText: {
    color: '#956D70',
    fontSize: 13,
    fontWeight: '700',
  },

  footerEmoji: {
    fontSize: 20,
    marginTop: 8,
  },
});
