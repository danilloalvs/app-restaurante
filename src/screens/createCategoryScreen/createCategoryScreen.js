import { useContext, useState } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
  } from "react-native";
  import { Button, List, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import HomeLogo from "app-restaurante/assets/home/home-logo.jpg";
import { createCategory, getCategories, updateCategory } from '../../../src/repository/categoryRepository';
import AppContext from '../../../src/services/appContext';
import { validateCategory } from '../../../src/services/categoryService';

const CreateCategoryScreen = ({ navigation }) => {

  const { setCategories, categoryEdit } = useContext(AppContext)
  const [description, setDescription] = useState(
    categoryEdit?.description || ""
  )
  let category = {
    description,
    is_deleted: false
  }

  if (categoryEdit) {
    category = categoryEdit
  }
  //functions
  async function saveDescription() {
    category.description = description

    try {
      let isNotValid = validateCategory(category)
      if (isNotValid) {
        return Alert.alert('Error', isNotValid)
      }

      try {
        if (category.id) {
          await updateCategory(category)
        } else {
          await createCategory(category)
        }

        let categories = await getCategories()

        setCategories(categories)
        navigation.navigate("CategoryScreen")
      } catch (err) {
        console.log(err)
        return Alert.alert('Error', "Ocorreu um erro")
      }
    } catch (error) {
      Alert.alert('Error', error)
    }
  }

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
  
        <Text style={styles.titulo}>Cadastro de Categorias</Text>

        <View style={{ height: "100%" , "width": "100%"}}>
          <List.Section>
            <List.Subheader>Cadastrar Categorias</List.Subheader>
              <TextInput
                label="Descrição"
                value={description}
                onChangeText={value => {
                setDescription(value)}}
              />
              <Button
                style={styles.marginTop10}
                icon={category.id ? "pencil" : "plus"}
                mode="contained"
                onPress={async () => await saveDescription()}
                >
                {category.id ? "Editar" : "Cadastrar"}
              </Button>
          </List.Section>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.touchableOpacityStyle}>
          <Image source={require('../../../assets/icons/back-white-icon.png')}
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

export default CreateCategoryScreen;

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
  });