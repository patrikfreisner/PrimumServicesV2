//import liraries
import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import CustomSearchBarComponent from './CustomSearchBar/CustomSearchBarComponent';
import { useLoginContext } from '../../../context/LoginContext'

// create a component
const SearchTabComponent = () => {
    const { logout } = useLoginContext();

    return (
        <ScrollView>
            <CustomSearchBarComponent />
            <Button mode='flat' onPress={logout}> Logout </Button>
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
export default SearchTabComponent;
