import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/screens/homeScreen/homeScreen';
import CategoryScreen from './src/screens/categoryScreen/categoryScreen';
import ProductScreen from './src/screens/productScreen/productScreen';
import CartScreen from './src/screens/cartScreen/cartScreen';
import OrderScreen from './src/screens/OrderScreen/orderScreen';
import OnboardingScreen from './src/screens/onboardingScreen/onboardingScreen';
import CreateCategoryScreen from './src/screens/createCategoryScreen/createCategoryScreen';
import CreateProductScreen from './src/screens/createProductScreen/createProductScreen';
import { runMigrationCart, runMigrationCartProducts, runMigrationCategories, runMigrationProduct } from './src/repository/dbConnection';
import { getCategories } from './src/repository/categoryRepository';
import { getProducts } from './src/repository/productRepository';
import { createCart, getCart } from './src/repository/cartRepository';
import AppContext from './src/services/appContext';

const Stack = createStackNavigator();

export default function App() {

  const [categories, setCategories] = useState([])
  const [categoryEdit, setCategoryEdit] = useState(undefined)

  const [products, setProducts] = useState([])
  const [productsEdit, setProductsEdit] = useState(undefined)

  const [cart, setCart] = useState(null)
  const [carts, setCarts] = useState([])

  const providers = {
    categories,
    setCategories,
    categoryEdit, 
    setCategoryEdit,

    products, 
    setProducts,
    productsEdit, 
    setProductsEdit,

    cart, 
    setCart,

    carts, 
    setCarts
  }

  let isAlreadyMigrated = false

  async function funcUseEffect() {
    if (!isAlreadyMigrated) {
      isAlreadyMigrated = true
      await runMigrationProduct()
      await runMigrationCart()
      await runMigrationCartProducts()
      await runMigrationCategories()
    }

    await loadParamters()
  }

  async function loadParamters() {
    let categories = await getCategories()
    let products = await getProducts()
    let cartAux = await getCart()

    let c = cartAux.filter(c => !c.is_finished)
    console.log(c)
    if (!c.length) {
      await createCart()

      cartAux = await getCart()

      c = cartAux.filter(c => !c.is_finished)
    }

    setCategories(categories)
    setProducts(products)
    setCart(c[0])
    setCarts(cartAux)
  }

  useEffect(() => {
    funcUseEffect()
  }, [])

  return (
    <>
    <AppContext.Provider value={providers}>
    <PaperProvider>
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
        <Stack.Screen name="CreateProductScreen" component={CreateProductScreen} />
      </Stack.Navigator>
    </NavigationContainer> 
    </PaperProvider>
    </AppContext.Provider>
    </>
  );
}