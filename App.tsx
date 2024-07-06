import { StyleSheet } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Home from './screens/Home';
import Search from './screens/Search';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import ProductDetail from './screens/ProductDetail';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cart from './screens/Cart';
import { Provider } from 'react-redux';
import store from './store';
import RegisterScreen from './screens/RegisterScreen';
import InfoUser from './screens/InfoUser';
import Pay from './screens/Pay';
import QandA from './screens/QandA';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Màn hình tab bottom
const TabScreens = ({route}) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ user: route.params.user }} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        initialParams={{ user: route.params.user }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" size={size} color={color} />
          ),
          headerShown: false 
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ user: route.params.user }} // Truyền thông tin người dùng từ TabScreen đến Profile
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} />
          ),
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
};

// App component
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TabScreen" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail}  options={{ headerShown: false }}/>
        <Stack.Screen name="Cart" component={Cart}  options={{ headerShown: false }}/>
        <Stack.Screen name="InfoUser" component={InfoUser}  options={{ headerShown: false }}/>
        <Stack.Screen name="Pay" component={Pay}  options={{ headerShown: false }}/>
        <Stack.Screen name="QandA" component={QandA}  options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
