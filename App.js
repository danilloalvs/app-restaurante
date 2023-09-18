import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/homeScreen/homeScreen';
import CategoryScreen from './src/screens/categoryScreen/categoryScreen';
import ProductScreen from './src/screens/productScreen/productScreen';
import CartScreen from './src/screens/cartScreen/cartScreen';
import OrderScreen from './src/screens/OrderScreen/orderScreen';
import OnboardingScreen from './src/screens/onboardingScreen/onboardingScreen';
import CreateCategoryScreen from './src/screens/createCategoryScreen/createCategoryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator      
      screenOptions={{
        headerShown: false,
      }}>        
        <Stack.Screen name="OnboardingScreen" 
        component={OnboardingScreen}                
        options={{tabBarStyle: { display: 'none'}}}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />        
        <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="CreateCategoryScreen" component={CreateCategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}