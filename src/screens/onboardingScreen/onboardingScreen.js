import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onDone={() => navigation.navigate('HomeScreen')}        
        pages={[
          {
            backgroundColor: '#fdeb93',            
            image: <Image source={require('app-restaurante/assets/onboarding/onboarding-img.png')} />,
            title: 'Bem vindo ao LariK!',
            subtitle: 'Temos as melhores opções pra aquela hora da fome!',
          },
        ]}
      />
    );
};

export default OnboardingScreen;