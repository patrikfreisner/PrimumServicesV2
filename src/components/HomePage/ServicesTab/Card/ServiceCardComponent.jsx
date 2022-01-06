//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-paper';

// create a component
const ServiceCardComponent = () => {
    return (
        <>
            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Formatação basica de computador!"
                    subtitle="Formatação basica para garantir o melhor funcionamento do seu dispositivo."
                    left={(props) => <Avatar.Icon {...props} icon="desktop-classic" />}
                />
            </Card>
            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Limpeza"
                    subtitle="Limpeza em casa ou apartamento, com 1 dia de antecedencia."
                    left={(props) => <Avatar.Icon {...props} icon="spray-bottle" />}
                />
            </Card>

            <Card style={{ marginBottom: 8, elevation: 4 }}>
                <Card.Title
                    title="Manutenção de automoveis particular."
                    subtitle="Sem tempo pra ir na mecanica? Vem pra manutenção particular, satisfação garantida!!!"
                    left={(props) => <Avatar.Icon {...props} icon="car-multiple" />}
                />
            </Card>
        </>
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
export default ServiceCardComponent;
