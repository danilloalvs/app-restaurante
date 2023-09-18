import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useContext } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import CategoryList from '../../components/categoryList';
import AppContext from "../../services/appContext"
import HomeLogo from "app-restaurante/assets/home/home-logo.jpg";

const CategoryScreen = ({ navigation }) => {
  const { categories, setCategoryEdit } = useContext(AppContext);
  let categoriesNotExcluded = categories.filter(c => !c.is_deleted)

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.homeLogoImg} source={HomeLogo} />
      </View>

      <View style={styles.category}>
        <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.categoryText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('CategoryScreen')}>
          <Text style={styles.categoryText}>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('ProductScreen')}>
          <Text style={styles.categoryText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('CartScreen')}>
          <Text style={styles.categoryText}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.categoryText}>Pedidos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Categorias</Text>


      <View style={{ height: "100%" }}>
      <ScrollView>
        {categoriesNotExcluded.length ? (
          categoriesNotExcluded.map((c, i) => (
            <CategoryList key={i} category={c} navigation={navigation} />
          ))
        ) : (
          <List.Subheader>Nenhuma Categoria Cadastrada</List.Subheader>
        )}
      </ScrollView>
    </View>


      <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => { setCategoryEdit(null); navigation.navigate('CreateCategoryScreen') }}
          style={styles.touchableOpacityStyle}>
          <Image source={require('../../../assets/icons/add-white-icon.png')}
          style={styles.floatingButtonStyle}
        />
        </TouchableOpacity>
   
    </View>      
      
    {/* <View>
      <Text>Category Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.goBack()}
      />
    </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
    alignItems: "flex-start",
  },
  header: {
    width: "100%",
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  homeLogoImg:{
    width: "100%",
    height: 200,
  },
  category: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    marginBottom: 15,      
  },
  categoryText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "700",
  },
  titulo: {
    marginTop: 20,
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
    textAlign: 'center',
    marginLeft: 135,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
  buttonContainer: {
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
});

export default CategoryScreen;