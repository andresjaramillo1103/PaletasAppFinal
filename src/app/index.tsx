
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CatalogoScreen from '../screens/CatalogoScreen';
import ConsultarPedidoScreen from '../screens/ConsultarPedidoScreen';
import HomeScreen from '../screens/HomeScreen';
import PedidosPersonalizadosScreen from '../screens/PedidosPersonalizadosScreen';
import QuienesSomosScreen from '../screens/QuienesSomosScreen';
import ResumenPedidoScreen from '../screens/ResumenPedidoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerTitleAlign: 'center' }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Nevados' }}
        />

        <Stack.Screen
          name="QuienesSomos"
          component={QuienesSomosScreen}
          options={{ title: 'Quiénes Somos' }}
        />

        <Stack.Screen
          name="Catalogo"
          component={CatalogoScreen}
          options={{ title: 'Catálogo de Sabores' }}
        />

        <Stack.Screen
          name="PedidosPersonalizados"
          component={PedidosPersonalizadosScreen}
          options={{ title: 'Pedidos Personalizados' }}
        />

        <Stack.Screen
          name="ResumenPedido"
          component={ResumenPedidoScreen}
          options={{ title: 'Resumen de Pedido' }}
        />
        <Stack.Screen
  name="ConsultarPedido"
  component={ConsultarPedidoScreen}
  options={{ title: 'Consultar mi pedido' }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
