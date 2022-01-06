//import liraries
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';

// create a component
const ServiceChipComponent = () => {
    return (
        <ScrollView horizontal={true} fadingEdgeLength={10} style={styles.bodyChipScrollView}>
            <Chip style={styles.chipComponent}> Informatica </Chip>
            <Chip style={styles.chipComponent}> Limpeza </Chip>
            <Chip style={styles.chipComponent}> Programação </Chip>
            <Chip style={styles.chipComponent}> Mecanica </Chip>
            <Chip style={styles.chipComponent}> Escola </Chip>
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    bodyChipScrollView: {
        marginTop: 10,
        marginBottom: 8,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    chipComponent: {
        marginLeft: 2,
        backgroundColor: '#e1e1e1'
    },
});

//make this component available to the app
export default ServiceChipComponent;
