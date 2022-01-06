//import liraries
import React, { useState } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { BottomNavigation, Searchbar, Card, Avatar, Button, Title, Paragraph, Subheading, Chip, Surface, Caption, Headline, IconButton } from 'react-native-paper';
import { useLoginContext } from '../../context/LoginContext';
import SearchTabComponent from './SearchTab/SearchTabComponent';
import ServicesTabComponent from './ServicesTab/ServiceTabComponent';

// create a component
function HomePage() {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Inicio', icon: 'home' },
        { key: 'search', title: 'Busca', icon: 'magnify' },
        { key: 'services', title: 'Serviços', icon: 'format-list-bulleted' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: ServicesTabComponent,
        search: SearchTabComponent,
        services: () => <Text>Hello</Text>,
    });

    return (
        <View style={{ height: '100%' }}>
            <BottomNavigation
                style={{ padding: 8 }}
                barStyle={styles.bottomBar}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting={true}
                sceneAnimationEnabled={true}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    bottomBar: {
        overflow: 'hidden',
        borderRadius: 5
    }
});

//make this component available to the app
export default HomePage;
