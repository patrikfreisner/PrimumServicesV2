//import liraries
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Surface, Button, Avatar } from 'react-native-paper'
import ServiceCardComponent from './Card/ServiceCardComponent';
import ServiceChipComponent from './Chip/ServiceChipComponent';

// create a component
const ServicesTabComponent = () => {
    return (
        <ScrollView>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Surface style={{ elevation: 4, borderRadius: 50 }}>
                    <Avatar.Icon style={{ alignSelf: 'center' }} size={45} icon="account" />
                </Surface>
                <Button style={{ padding: 0, margin: 0, alignSelf: 'center' }} compact={true} icon="chevron-down" mode="text">
                    Rua. Domingos Murara
                </Button>
            </View>

            <ServiceChipComponent />

            <ServiceCardComponent />

        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ServicesTabComponent;
