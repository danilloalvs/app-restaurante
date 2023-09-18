import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import HomeLogo from "app-restaurante/assets/home/home-logo.jpg";

function HomeScreen({ navigation }) {
    return (   
      <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.homeLogoImg} source={HomeLogo} />
      </View>

      <View style={styles.category}>
        <TouchableOpacity style={styles.botaoMenu}
        onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.categoryText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu}
        onPress={() => navigation.navigate('CategoryScreen')}>
          <Text style={styles.categoryText}>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu}
        onPress={() => navigation.navigate('ProductScreen')}>
          <Text style={styles.categoryText}>Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu}
        onPress={() => navigation.navigate('CartScreen')}>
          <Text style={styles.categoryText}>Carrinho</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoMenu}
        onPress={() => navigation.navigate('OrderScreen')}>
          <Text style={styles.categoryText}>Pedidos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Tela inicial</Text>

    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fdeb93",
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
    botaoMenu:{

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
  });

export default HomeScreen;